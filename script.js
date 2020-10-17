async function createTicket(){

    var API_KEY = "cit8w8IQugGhi9HmtQZQ";
    var FD_ENDPOINT = "newaccount1602916564974.freshdesk.com";
    var ticketBody = {
      "helpdesk_ticket":{
        "subject":"Sample ticket from JavaScript",
        "description":"Sample ticket from JavaScript",
        "email":"example@example.com",
        "priority":1,
        "status":2
      }
    }
    
    var params = {
      hostname : FD_ENDPOINT ,
      path : "/helpdesk/tickets.json",
      method: "POST",
      headers: {"Content-type": "application/json",
                "Content-length":JSON.stringify(ticketBody).length},
      auth : API_KEY + ":X"  
            
    }
    
    var req = https.request(params);
    req.write(JSON.stringify(ticketBody));
    var res = req.end();
    
    console.log(req,res);
    
    }
    
    async function getTickets(){
    
        var API_KEY = "cit8w8IQugGhi9HmtQZQ";
        var FD_ENDPOINT = "https://newaccount1602916564974.freshdesk.com//api/v2/tickets";
    
        var response = await fetch(FD_ENDPOINT, {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(API_KEY + ":X")
            },
        });
    
        return response.json();
    
    }
    
    function listTickets(){
    getTickets()
      .then(data => {
        console.log(data);
        var targetDiv = document.getElementById("outputArea");

        //To clear current contents of Output Area
        while (targetDiv.firstChild) {
            targetDiv.removeChild(targetDiv.lastChild);
          }
        var table1 = document.createElement('table');
        table1.setAttribute('class','table');
    
        var tableHead = document.createElement('thead');
        
        var trInHead = document.createElement('tr');
    
        var th1 = document.createElement("th");
        th1.setAttribute('scope','col');
        th1.innerHTML = '#'
    
        var th2 = document.createElement("th");
        th2.setAttribute('scope','col');
        th2.innerHTML = 'Subject'
    
        var th3 = document.createElement("th");
        th3.setAttribute('scope','col');
        th3.innerHTML = 'Priority'
    
        var th4 = document.createElement("th");
        th4.setAttribute('scope','col');
        th4.innerHTML = 'Status'
    
        trInHead.append(th1,th2,th3,th4);
        tableHead.appendChild(trInHead);
    
        var tableBody = document.createElement('tbody');
    
        for(let i=0;i<data.length;i++){
            var trInBody = document.createElement('tr');
    
            var thInTr = document.createElement('th');
            thInTr.setAttribute('scope','row');
            thInTr.innerHTML = i+1;
    
            var td1 = document.createElement('td');
            td1.innerHTML = data[i].subject;
    
            var td2 = document.createElement('td');
            td2.innerHTML = data[i].priority;
            
            var td3 = document.createElement('td');
            td3.innerHTML = data[i].status;
    
            trInBody.append(thInTr, td1, td2, td3);
            tableBody.appendChild(trInBody);
        }
    
        table1.append(tableHead,tableBody)
        targetDiv.appendChild(table1);

        document.getElementById('listTickets').blur();
      })
      .catch(function(error){
        console.log(error);
    });
    }