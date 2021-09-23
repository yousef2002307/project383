//////vars
let currentindex = 0;
let h2 = document.querySelector(".quiz-questions h2");
let inputs = document.querySelector(".inputs");
let span = document.querySelector(".q");
let spans = document.querySelector(".spans");
let submit = document.querySelector("button");
let rightanswer = 0;
let timinginterval;
/////xhttml request
calling();
function calling (){
  let x = new XMLHttpRequest();
  x.onreadystatechange = function (response) {
    if(this.status == 200 && this.readyState == 4){
      let data = JSON.parse(this.responseText);
      console.log(data);
      span.textContent = data.length;
        funtitle(data.length,data);
        funanswers(data.length,data);
        funspans(data.length);
        timing(data.length,data);

        /////clicking on button
        submit.onclick = function(){
          clearInterval(timinginterval);
           rightwronganswers(data.length,data);
            currentindex++;
            funtitle(data.length,data);
            funanswers(data.length,data);
            funspans(data.length);
            showresults(data.length,data);
            timing(data.length,data);
         
            
        }
    }
  }
  x.open("GET","jo.json");
  x.send();

}
/////title function
function funtitle(length,data){
  h2.innerHTML = '';
  if(length > currentindex){
h2.textContent = data[currentindex].title;
  }
}
////////answers function
function funanswers (length,data) {
  inputs.innerHTML = ''
if(length > currentindex){
for(let i =1; i <= 4; i++){

  let div = document.createElement("div");
let divclass = document.createAttribute("class");
divclass.value = 'input';
div.setAttributeNode(divclass);
  let input = document.createElement("input");
  let inputtype = document.createAttribute("type");
  inputtype.value = 'radio';
  input.setAttributeNode(inputtype);
  let inputname = document.createAttribute("name");
  inputname.value = 'x';
  if(i == 1){
    input.checked = true;
  }
  input.setAttributeNode(inputname);
  div.appendChild(input);
  let label = document.createElement("label");
  let labeltext = document.createTextNode(data[currentindex][`answer_${i}`]);
  label.appendChild(labeltext);
  div.appendChild(label);
  inputs.appendChild(div);
  
}

}
}
/////////span function
function funspans(length){
  spans.innerHTML ='';
  if(length > currentindex){
  for(let i =0; i < length;i++){
      let span3 = document.createElement("span");
      spans.appendChild(span3);
  }
 let spans2 = document.querySelectorAll(".spans span");
 let spans2array = Array.from(spans2);
spans2array.forEach((ele,index) => {
  if(index ==  currentindex){
      ele.classList.add('active');
  }
})
}
}

///rightwronganswers
function rightwronganswers(length,data){
  if(length > currentindex){
    let radio = document.getElementsByName("x");
    let radioarray = Array.from(radio);
  radioarray.forEach(ele => {
      if(ele.checked == true){
       // console.log(ele.nextElementSibling.textContent)
       if(ele.nextElementSibling.textContent == data[currentindex].right_answer){
       rightanswer++;
       console.log(rightanswer);
       }
      }
  });
  }

}
////////show results
function showresults(length,data){
if(currentindex >= length){
  console.log(rightanswer);
  document.querySelector(".results").textContent = `you got ${rightanswer} right out of ${length}`
}
}
//////////timing function
function timing(length,data){
  if(length > currentindex){
    let min = 0;
    let sec = 10;
   timinginterval = setInterval(() => {
     if(sec >= 0){
       document.querySelector(".timing").textContent = `${min} : ${sec}`
      sec--;
      if(sec < 0){
        clearInterval(timinginterval);
     submit.click();
   
      }
     }
   },1000);

  }else{
    document.querySelector(".timing").textContent = '';
  }
}



























