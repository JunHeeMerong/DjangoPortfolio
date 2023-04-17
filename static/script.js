(function(){
    // span 요소 노드 가져오기
    const spanEl = document.querySelector("main h2 span");
    // 화면에 표시할 문장 배열
    const txtArr = ['여기다가','이것저것','자랑할거 써봐요'];
    // 배열의 인덱스 초깃값
    let index = 0;
    // 화면에 표시할 문장 배열에서 요소를 하나 가져온 뒤, 배열로 만들기
    let currentTxt = txtArr[index].split("");
    function writeTxt(){
        spanEl.textContent += currentTxt.shift(); // ①
        if(currentTxt.length !== 0){ // ②
        setTimeout(writeTxt, Math.floor(Math.random() * 200));
        }else{ // ③
        currentTxt = spanEl.textContent.split("");
        setTimeout(deleteTxt, 1500);
        }
    }
    writeTxt();
    function deleteTxt(){
        currentTxt.pop(); // ①
        spanEl.textContent = currentTxt.join("");// ②
        if(currentTxt.length !== 0){ // ③
        setTimeout(deleteTxt, Math.floor(Math.random() * 200));
        }else{ // ④
        index = (index + 1) % txtArr.length;
        currentTxt = txtArr[index].split("");
        writeTxt();
        }
    }
})();

/* 수직 스크롤이 발생하면 header 태그에 active 클래스 추가 및 삭제 */
const headerEl = document.querySelector("header");
window.addEventListener('scroll', function(){
  requestAnimationFrame(scrollCheck);
});
function scrollCheck(){
  let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
  if(browerScrollY > 650){
    headerEl.classList.add("active");
  }else{
    headerEl.classList.remove("active");
  }
}

// function home_click(){
//   window.scrollTo(0,0);
// }
// function About_click(){
//     window.scrollTo(0,750);
// }
// function Features_click(){
//     window.scrollTo(0,2100);
// }
// function Portfolio_click(){
//     window.scrollTo(0,2586);
// }
// function Contact_click(){
//     window.scrollTo(0,3624);
// }

/* 애니메이션 스크롤 이동 */
const animationMove = function(selector){
  // ① selector 매개변수로 이동할 대상 요소 노드 가져오기
  const targetEl = document.querySelector(selector);
  // ② 현재 웹 브라우저의 스크롤 정보(y 값)
  const browserScrollY = window.pageYOffset;
  // ③ 이동할 대상의 위치(y 값)
  const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;
  // ④ 스크롤 이동
  window.scrollTo({ top: targetScorllY, behavior: 'smooth' });
};

const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']"); 
for(let i = 0; i < scollMoveEl.length; i++){
  scollMoveEl[i].addEventListener('click', function(e){
    const target = this.dataset.target;
    animationMove(target);
  });
}

// const aEl = document.querySelector("a");
// aEl.removeAttribute("class");
// aEl.setAttribute("target","_blank");