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

  console.log({ response });

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

// const operationsDoc = `
//     query MyQuery {
//         users(where: {issuer: {_eq: "token"}})
//         {
//             id
//             email
//             issuer
//         }
//     }
// `;

// function fetchMyQuery() {
//   return queryHasuraGraphQL(
//     operationsDoc,
//     "MyQuery",
//     {},
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHgxQjgyZUViNzdmMDY5M2EzRDMzNkFCODU1N0I5NEZFNUU2ZjI4YzlGIiwiZW1haWwiOiJkYXJpby5uaWhpbEBnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwid2FsbGV0cyI6W10sImlhdCI6MTY3NDU2NDQ4OCwiZXhwIjoxNjc1MTY5Mjg4LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiZGlkOmV0aHI6MHgxQjgyZUViNzdmMDY5M2EzRDMzNkFCODU1N0I5NEZFNUU2ZjI4YzlGIn19.m8KZmK8LflyeAZsu3uQkCM2pGHiRzjU3M5OhLq3N1xM"
//   );
// }

// export async function startFetchMyQuery() {
//   const { errors, data } = await fetchMyQuery();

//   if (errors) {
//     // handle those errors like a pro
//     console.error(errors);
//   }

//   // do something great with this precious data
//   console.log(data);
// }
