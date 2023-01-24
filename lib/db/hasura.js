export const queryHasuraGraphQL = async (
  operationsDoc,
  operationName,
  variables
) => {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
      "content-type": "application/json",
    },
  });

  return await result.json();
};

// function fetchMyQuery() {
//   const operationsDoc = `
//         query MyQuery {
//           users {
//             email
//             id
//             issuer
//             publicAddress
//           }
//         }
//       `;

//   return queryHasuraGraphQL(operationsDoc, "MyQuery", {});
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
