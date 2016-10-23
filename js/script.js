var works = [
  {name:"proto", href:"https://github.com/mads2ez/ind_proto", path:"img/indproto.png"},
  {name:"test", href:"", path:"img/framer-icon.png"},
  {name:"test", href:"", path:"img/framer-icon.png"},
  {name:"test", href:"", path:"img/framer-icon.png"},
  {name:"test", href:"", path:"img/framer-icon.png"},
  {name:"test", href:"", path:"img/framer-icon.png"}
];

$(document).ready(function() {
  for (i = 0; i < works.length; i++) {
    $('.thumb-wrap').append('<a href="'+ works[i].href + '" id="' + works[i].name + '" class="thumb-item"><div class="thumb-overlay" style="background-image: url(' + works[i].path + ')"><div class="thumb-shade"><div class="thumb-shade-title">view</div></div></div><div class="thumb-title">' + works[i].name + '</div></a>');
  }
});
