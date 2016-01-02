'use strict';

(function() {

var name = 'repeating-quad',
  divSelect = '#hook-'+name,
  idName = 'id-'+name,
  guiDiv = 'gui-'+name;

var options = {
  width: 250,
  height: 250,
  numCols: 5,
  strokeWidth1: 4,
  strokeWidth2: 4,
  space2: 12
}

function update(options) {

  var svg = d3.select(divSelect)
    .append('svg')
    .attr('id', idName)
    .attr('width', options.width)
    .attr('height', options.height)

  var quadEdge = options.width / options.numCols;
console.log(quadEdge);
  var i, j;
  for(i=0; i<options.numCols; ++i) {
    var isOddX = i%2==0;
    var flag = isOddX
    for(j=0; j<options.numCols; j++) {
      var quad = svg
        .append('g')
        .attr('transform', function(d) {
          var x = quadEdge * i;
          var y = quadEdge * j;

          return 'translate('+x+','+y+')';
        });

      quad.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', quadEdge)
        .attr('height', quadEdge)
        .style('stroke', 'none')
        .style('fill', flag ? 'black' : 'white');

      quad.append('rect')
        .attr('x', options.strokeWidth1/2)
        .attr('y', options.strokeWidth1/2)
        .attr('width', quadEdge - options.strokeWidth1)
        .attr('height', quadEdge - options.strokeWidth1)
        .style('stroke', !flag ? 'black' : 'white')
        .style('stroke-width', options.strokeWidth1)
        .style('fill', 'none');

      quad.append('rect')
        .attr('x', options.space2+options.strokeWidth2/2)
        .attr('y', options.space2+options.strokeWidth2/2)
        .attr('width', quadEdge - options.strokeWidth2 - options.space2*2)
        .attr('height', quadEdge - options.strokeWidth2 - options.space2*2)
        .style('stroke', !flag ? 'black' : 'white')
        .style('stroke-width', options.strokeWidth2)
        .style('fill', 'none');


      flag = !flag;
    }
  }

}

function redraw(id, oldval, newval) {
  var element = document.getElementById(idName);
  element.parentNode.removeChild(element);
  update(options);
  return newval;
}

function init() {
  console.log(name);

  var gui = new dat.GUI({ autoPlace: false });
  gui.add(options, 'numCols', 1, 30);
  gui.add(options, 'strokeWidth1', 1, 30);
  gui.add(options, 'strokeWidth2', 1, 30);
  gui.add(options, 'space2', 1, 30);

  var customContainer = document.getElementById(guiDiv);
  customContainer.appendChild(gui.domElement);

  options.watchDeep(redraw);

  update(options);
};
init();

}())
