// Copy to your browser console!
async function getDiscs() {
  const sleepSeconds = 3; // CHANGE THIS ACCORDING TO YOUR INTERNET SPEED. USED TO DETERMINE HOW LONG APP WAITS FOR DISCS TO LOAD

  let links = []; 

  if(!document.getElementsByClassName("NextPageLink")[1]) {
    return getDiscUrls()
  }
  
  while(!document.getElementsByClassName("NextPageLink")[1].className.includes("DisabledPageLink")) {
    let a = document.getElementsByClassName("NextPageLink")[1].firstChild
    
    if(a && a.click) {
      a.click(); 
    }
    
    links.push(getDiscUrls())
    
    console.log("sleeping for " + sleepSeconds + " seconds") 
    await sleep(sleepSeconds * 1000)
  } 
  
  links.push(getDiscUrls())
  
  console.log("Done, sending to parser!")
  return [].concat(...links);
}

function getDiscUrls() {
  return Array.from(document.getElementsByClassName("ProductImage")).map(disc => disc.href);
}

async function postDiscs(urls) {
  console.log("SENDING...", urls)

  fetch("http://localhost:3000/discs", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
    body: `data=${JSON.stringify(urls)}`
  })

  console.log("SENT")
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sendToBackend() {
  fetch()
}

postDiscs(await getDiscs())
  