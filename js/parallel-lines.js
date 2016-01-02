'use strict';

(function() {

var name = 'parallel-lines',
  divSelect = '#hook-'+name,
  idName = 'id-'+name,
  guiDiv = 'gui-'+name;

var options = {
  width: 250,
  height: 250,
  numLines: 10,
  numRect: 15,
  frequency: 2.5,
  amplitude: 6
}

function update(options) {

  var svg = d3.select(divSelect)
    .append('svg')
    .attr('id', idName)
    .attr('width', options.width)
    .attr('height', options.height)

  var i, j;
  for(i=0; i<options.numLines; ++i) {
    var lineHeight = options.height/options.numLines;

    var line = svg
      .append('g')
      .attr('transform', function(d) {
        return 'translate(0,'+i*lineHeight+')'
      });

    var innerLine = line
      .append('g')
      .attr('transform', function(d) {
        var theta = d3.scale.linear()
          .domain([0, options.numLines])
          .range([0, Math.PI*options.frequency]);
        var x = Math.sin(theta(i))*options.amplitude;
        return 'translate('+x+',0)'
      });

    for(j=0; j<options.numRect; ++j) {
      var isOdd = (j%2)==0;
      var rectWidth = options.width/options.numRect;
      innerLine.append('rect')
        .attr('x', function(d) { return j*rectWidth })
        .attr('y', 0)
        .attr('width', function(d) { return rectWidth })
        .attr('height', lineHeight)
        .style('stroke', isOdd ? 'black' : 'white')
        .style('fill', isOdd ? 'black' : 'white');
    }

    line
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', options.width)
      .attr('height', function (d) { return lineHeight })
      .style('stroke', 'gray')
      .style('fill', 'rgba(1,1,1,0)');
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
  gui.add(options, 'numLines', 1, 30);
  gui.add(options, 'numRect', 1, 30);
  gui.add(options, 'frequency', 0, 30);
  gui.add(options, 'amplitude', 0, 30);

  var customContainer = document.getElementById(guiDiv);
  customContainer.appendChild(gui.domElement);

  options.watchDeep(redraw);

  update(options);
};
init();

}())
