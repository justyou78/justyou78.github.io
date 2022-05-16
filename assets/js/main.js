var productBox = document.getElementById('productBox');
var frontImg = document.getElementById('frontImg');
var backImg = document.getElementById('backImg');
var blogButtons = document.getElementsByName('blog');
var projectButtons = document.getElementsByName('project');

function flipRight() {
  productBox.style.transform = 'rotateY(180deg)';
  frontImg.style.left = '650px';
  backImg.style.left = '30px';
  frontImg.style.transform = 'rotate(-30deg)';
  backImg.style.transform = 'rotate(10deg)';

  projectButtons.forEach((bt) => {
    bt.style.background = 'rgba(156, 216, 244, 0.5)';
  });
  blogButtons.forEach((bt) => {
    bt.style.removeProperty('background');
  });
}

function flipLeft() {
  productBox.style.transform = 'rotateY(0deg)';
  frontImg.style.left = '30px';
  backImg.style.left = '-650px';
  frontImg.style.transform = 'rotate(10deg)';
  backImg.style.transform = 'rotate(-30deg)';

  blogButtons.forEach((bt) => {
    bt.style.background = 'rgba(156, 216, 244, 0.5)';
  });
  projectButtons.forEach((bt) => {
    bt.style.removeProperty('background');
  });
}

function movePage(type) {
  if (type === 'project') {
    alert('준비중....');
  }
  var link = window.location.href;
  location.href = `${link}/blog`;
}

// 초기 블로그 버튼 활성화
flipLeft();
