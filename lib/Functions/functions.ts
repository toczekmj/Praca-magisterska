import { functions } from "../Database/appwrite";

export {
    ExecuteFtt,
}

function ExecuteFtt(fileId: string) {
  const promise = functions.createExecution({
    functionId: "698b209e6073c2cae16e",
    body: `{"fileId": "${fileId}"}`,
  });

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    },
  );
}
