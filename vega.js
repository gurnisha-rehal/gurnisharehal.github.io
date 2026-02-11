//Vega-lite Visualizations
  //Load data from dataset/videogames_wide.csv using d3.csv and then make visualizations

async function fetchData(){
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {
  const vlSpec = vl
  .markBar()
  .data(data)
  .encode(
  vl.y().fieldN("Platform").sort("-x"),
  vl.x().fieldQ("Global_Sales").aggregate("sum"),
  vl.color().fieldN("Genre")
)
.width("container")
.height(400)
.toSpec();

render("#view", vlSpec);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}