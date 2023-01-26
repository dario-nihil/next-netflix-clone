export const getWatchedVideos = async (token, userId) => {
  const operationsDoc = `
    query watchedVideos($userId: String!) {
      stats(where: {
        watched: {_eq: true}, 
        userId: {_eq: $userId}, 
      }) {
        videoId
      }
    }
  `;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "watchedVideos",
    {
      userId,
    },
    token
  );

  return response?.data?.stats;
};

export const insertStats = async (
  token,
  { userId, watched, videoId, favourited }
) => {
  const operationsDoc = `
  mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String! ) {
    insert_stats_one(object: { 
      favourited: $favourited, 
      userId: $userId, 
      watched: $watched, 
      videoId: $videoId
    }) {
      favourited
      userId
    }
  }`;

  return await queryHasuraGraphQL(
    operationsDoc,
    "insertStats",
    {
      userId,
      videoId,
      watched,
      favourited,
    },
    token
  );
};

export const updateStats = async (
  token,
  { userId, watched, videoId, favourited }
) => {
  const operationsDoc = `
  mutation updateStats($favourited: Int!, $watched: Boolean!, $userId: String!, $videoId: String!) {
    update_stats(
      _set: {watched: $watched, favourited: $favourited}, 
      where: {
        userId: {_eq: $userId}, 
        videoId: {_eq: $videoId}
      }) {
        returning {
          favourited
          userId
          watched
          videoId
        }
    }
  }`;

  return await queryHasuraGraphQL(
    operationsDoc,
    "updateStats",
    {
      userId,
      videoId,
      watched,
      favourited,
    },
    token
  );
};

export const findVideoIdByUser = async (token, userId, videoId) => {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      videoId
      userId
      watched
      favourited
    }
  }`;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "findVideoIdByUserId",
    {
      userId,
      videoId,
    },
    token
  );

  return response?.data?.stats;
};

export const createNewUser = async (token, metadata) => {
  const { issuer, publicAddress, email } = metadata;

  const operationsDoc = `
  mutation createNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
  `;

  return await queryHasuraGraphQL(
    operationsDoc,
    "createNewUser",
    {
      issuer,
      publicAddress,
      email,
    },
    token
  );
};

export const isNewUser = async (token, issuer) => {
  const operationsDoc = `
    query isNewUser($issuer: String!) {
        users(where: {issuer: {_eq: $issuer}})
        {
            id
            email
            issuer
        }
    }
`;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "isNewUser",
    {
      issuer,
    },
    token
  );

  return response?.data?.users.length === 0;
};

export const queryHasuraGraphQL = async (
  operationsDoc,
  operationName,
  variables,
  token
) => {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  return await result.json();
};
