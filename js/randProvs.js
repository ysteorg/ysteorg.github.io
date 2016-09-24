var gSeedNum = (new Date().getTime());
var gProvsNum = parseInt(getQueryString("provs")) || 7;
if (gProvsNum < 0) {
  gProvsNum = 1;
}

var gTooltip = d3.select("body").append("div")
  .attr("id", "tooltip")
  .style("display", "none")
  .style("position", "absolute")
  .html("<label><span id=\"tt_prov\"></span></label>");

var gColorScale = d3.scale.category20();

var gWidth = 960, gHeight = 600;

var gProjection = d3.geo.mercator().center([105, 38]).scale(750)
  .translate([gWidth/2, gHeight/2]);
var path = d3.geo.path().projection(gProjection);

var gChnSvg = d3.select("body").append("svg")
  .attr("width", gWidth)
  .attr("height", gHeight);

queue()
  .defer(d3.json, "data/chnCities.json")
  .defer(d3.json, "data/chnProvs.json")
  .await(randomMap);

function randomMap(error, cities, provinces) {
  var id2ProvMap = d3.map();
  for (idx in provinces.features) {
    st = provinces.features[idx];
    id2ProvMap.set(st.id, st.properties.name);
  }
  sampleProvs = randSample(id2ProvMap.keys(), gSeedNum, gProvsNum);

  gChnSvg.append("g")
      .attr("class", "cities")
      .selectAll("path")
      .data(cities.features)
      .enter()
      .append("path")
      .attr("d", path);

  gChnSvg.append("g")
      .attr("class", "provinces")
      .selectAll("path")
      .data(provinces.features)
      .enter()
      .append("path")
      .attr("d", path)
      .on("mouseover", function(d) {
        var m = d3.mouse(d3.select("body").node());
        gTooltip.style("display", null)
          .style("left", m[0] + 10 + "px")
          .style("top", m[1] - 10 + "px");
        $("#tt_prov").text(d.properties.name);
      })
      .on("mouseout", function() {
        gTooltip.style("display", "none");
      });
  gChnSvg.select(".provinces")
    .selectAll("path")
    .data(provinces.features)
    .style("fill", function(d) {
      if (sampleProvs.indexOf(d.id) >= 0) {
        return gColorScale(d.id);
      }
    });
}
