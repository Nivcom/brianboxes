function GetData(event) {
  //=============================Get prepped value ,product number, and Comments from the html form to the sql.==========================
  var rowQ = event.target.closest('tr').querySelector.bind(event.target.closest('tr')),
    preppedvalue = parseInt(rowQ('.ig').value, 10),
    prodG = rowQ('.identity').innerHTML,
    comments = rowQ('.comm').value,
    TTqty = parseInt(rowQ('.qty').innerHTML, 10);

  //=================== Check prepped value against total quantity==============================
  if (preppedvalue > TTqty) {
    alert("Ooops, you over-prepped");
  }
  if (preppedvalue < TTqty) {
    alert("Ooop, you under-prepped");
  }
  //==================== Prepare formData=================================
  var formData = new FormData();
  formData.append('preppedvalue', preppedvalue);
  formData.append('prodG', prodG);
  formData.append('comments', comments);

  //================= Posting formData to the server side using Fetch API================================
  fetch("DbSave.php", {
    method: "POST",
    body: formData
  })
    .then(resp => resp.text())
    .then(() => {
      alert("Data has been saved successfully :-)");
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occured while saving data');
    });

}
//========================= API fetching Data from server side to client side =====================================
fetch('Dbfetch.php')
  .then(res => res.json())
  .then(sqldata => {
    sqldata.forEach(element => {
      var productID = element.Product_ID;
      var Prepped_value = element.Prepped_value.trim();
      var Comments = element.Comments;

      var GetSqlData =
      {
        Prepped_val: Prepped_value,
        comm: Comments

      }
      window.localStorage.setItem(productID, JSON.stringify(GetSqlData));

    });
  }).catch(error => console.error('Error fetching JSON:', error));

//===================================== API fetching Data from build plan===========================================================

fetch('http://singlesource.brains.ads/efacs/api/WorksOrder')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('table-body');
    //***********Loop setting values for Product code, number, Total Quantity and Prepped*************************
    data.forEach(item => {
      const row = document.createElement('tr');
      var prodcode = item.wpart;
      var ProdNo = item.won;
      var ProdQty = item.woq;
      // console.log(ProdQty);

      //***Fetching Data from the local database */
      var storedData = window.localStorage.getItem(ProdNo);
      if (storedData) {
        var localData = JSON.parse(storedData);
        var pval = localData.Prepped_val;
        var comts = localData.comm;
        //console.log(pval,comts);
        var numerator = JSON.parse(pval);
        //console.log(numerator)
        var numerators = parseInt(numerator);

        //********Setting the width of the coloured percentage***************
        var width = (numerators / ProdQty) * 100;
        //console.log(width);

        //================================== ******************table rows*******************************=================================

        row.innerHTML = `<td class="prodg">${prodcode}</td>
        <td><a href="http://singlesource/efacs/workinstructions/worksorder/${ProdNo}" target="workinstructions" class="identity">${ProdNo}</a></td>
        
        <td><div class "relod"><input type= number class="ig" value= "${numerators}"></div></td>
      <td>
      <div class="w3-light-grey">
     <div class="w3-green"style="height:24px;width:${width || 0}%">${width.toFixed()}% </div>
      </div>
      </td> 
      <td class="qty">${ProdQty}</td>
      <td ><textarea class ="comm" placeholder="Editing comment ?">${comts}</textarea></td>
      <td><button onclick="GetData(event)" type="button" role="button" class="saveButton">Save</button></td>`;

        //==============================********************End of Table rows******************===================================

        // ==================Do the same thing even when null just change null to 0=============================
      } else if (!storedData) {
        storedData = storedData || 0;
        var localData = JSON.parse(storedData);
        var pval = localData.Prepped_val;
        var comts = localData.comm;
        //console.log(pval,comts);
        numerator = pval;
        //console.log(numerator)
        numerators = parseInt(numerator);
        //********Setting the width of the coloured percentage***************
        width = (numerators / ProdQty) * 100;
        //console.log(width);

        // =======================******************table rows*******************************=========================
        row.innerHTML = `<td class="prodg">${prodcode}</td>

        <td><a href="http://singlesource/efacs/workinstructions/worksorder/${ProdNo}" target="workinstructions" class="identity">${ProdNo}</a></td>
        
 
        <td><input type= number class="ig" value= "${pval || 0}"></td>
      <td>
      <div class="w3-light-grey">
     <div class="w3-green"style="height:24px;width:${width || 0}%">${width.toFixed()}% </div>
      </div>
      </td>
      <td class="qty">${ProdQty}</td>
      <td ><textarea class ="comm" placeholder="Any Comment?Max 2 lines">${comts || ''}</textarea></td>
      <td><button onclick="GetData(event)" type="button" role="button" class="saveButton">Save</button></td>`;
      }
      //======================================== Append rows to the table=========================================
      tableBody.appendChild(row);

const overlay = document.getElementById('overlay-textarea');
if (ProdNo = '')


overlay.value =prodcode;

    });

  })
  .catch(error => console.error('Error fetching JSON:', error));

function filterFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("SearchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table-body");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td1 = tr[i].getElementsByTagName("td")[0]; // Change the index to the column you want to filter
    td2 = tr[i].getElementsByTagName("td")[1];
    if (td1 || td2) {
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;

      combinedTxtValue = txtValue1 + "" + txtValue2;
      if (combinedTxtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
window.onload = function() {
  document.getElementById('overlay').style.display = 'flex';
};

// Close the overlay
function closeOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

