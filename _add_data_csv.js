// Import the functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

var apiKey = "";
var authDomain = "";
var projectId = "";
var storageBucket = "";
var messagingSenderId = "";
var appId = "";
var measurementId = "";
var initializeApp_check = false;
var import_success = false;
var config_success = false;
function details_function() {
  apiKey = document.getElementById("apiKey").value;
  console.log(apiKey);

  authDomain = document.getElementById("authDomain").value;
  console.log(authDomain);

  projectId = document.getElementById("projectId").value;
  console.log(projectId);

  storageBucket = document.getElementById("storageBucket").value;
  console.log(storageBucket);

  messagingSenderId = document.getElementById("messagingSenderId").value;
  console.log(messagingSenderId);

  appId = document.getElementById("appId").value;
  console.log(appId);

  measurementId = document.getElementById("measurementId").value;
  console.log(measurementId);
  config_success = true;
  if (config_success == true) { document.getElementById("results_paragraph").innerText = "Config Success!"; }

};

// #################################################################  
// Check data type of content_field for numeric
// #################################################################  
function isNumeric(str) {
  if (!isNaN(parseFloat(str)) && isFinite(str)) {
    str = parseInt(str)
  } return str;
};

function add_data_to_firestore() {

  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
  };

  const app = initializeApp(firebaseConfig);
  initializeApp_check = true;
  const db = getFirestore(app);
  var collection_name = "collection_name";

  const obj = {};

  // #################################################################  
  // Header Array to Field names
  // #################################################################  
  let header = lines[0][0];
  const header_Array = header.split(",");

  for (var y = 1; y < lines.length; y++) {
    var document_name = "document_name: " + y;

    for (var i = 0; i < header_Array.length; i++) {
      var field = (header_Array[i]);

      // #################################################################  
      // Content Array to Field names
      // #################################################################
      let content = lines[y][0];
      const content_Array = content.split(",");

      var content_field = (content_Array[i]);
      content_field = isNumeric(content_field);
      const yourKeyVariable = field;
      const someValueArray = content_field;
      obj[yourKeyVariable] = someValueArray

      setDoc(doc(db, collection_name, document_name), obj)
        .then(() => {
          console.log("Document successfully written!");
          import_success = true;
          if (import_success == true) { document.getElementById("results_paragraph").innerText = "Import Success!"; }


        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    };
  };

}

document.getElementById("upload_data_button").addEventListener("click", add_data_to_firestore);
document.getElementById("details").addEventListener("click", details_function);