'use strict';

(function() {

var name = 'outer-quad',
  divSelect = '#hook-'+name,
  idName = 'id-'+name,
  guiDiv = 'gui-'+name;

var options = {
  width: 250,
  height: 250,
  quadEdge: 30,
  innerEdge: 5,
  innerSpace: 2
}

function update(options) {

  var svg = d3.select(divSelect)
    .append('svg')
    .attr('id', idName)
    .attr('width', options.width)
    .attr('height', options.height)

  var numCols = options.width/options.quadEdge;
  var numRows = options.height/options.quadEdge;

  var i, j;
  for(i=0; i<numCols; ++i) {
    var isOddX = i%2==0;
    var flag = isOddX
    for(j=0; j<numRows; j++) {
      var quad = svg
        .append('g')
        .attr('transform', function(d) {
          var x = options.quadEdge * i;
          var y = options.quadEdge * j;

          return 'translate('+x+','+y+')';
        });

      quad.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', options.quadEdge)
        .attr('height', options.quadEdge)
        .style('stroke', 'none')
        .style('fill', flag ? 'black' : 'white');

      quad.append('rect')
        .attr('x', options.innerSpace)
        .attr('y', options.quadEdge - options.innerSpace-1 - options.innerEdge)
        .attr('width', options.innerEdge)
        .attr('height', options.innerEdge)
        .style('stroke', 'none')
        .style('fill', !flag ? 'black' : 'white');

      quad.append('rect')
        .attr('x', options.quadEdge - options.innerSpace-1 - options.innerEdge)
        .attr('y', options.innerSpace)
        .attr('width', options.innerEdge)
        .attr('height', options.innerEdge)
        .style('stroke', 'none')
        .style('fill', !flag ? 'black' : 'white');

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
  gui.add(options, 'quadEdge', 1, 30);
  gui.add(options, 'innerEdge', 1, 30);
  gui.add(options, 'innerSpace', 1, 30);

  var customContainer = document.getElementById(guiDiv);
  customContainer.appendChild(gui.domElement);

  options.watchDeep(redraw);

  update(options);
};
init();

}())
