//Vega-lite Visualizations
  //Load data from dataset/videogames_wide.csv using d3.csv and then make visualizations

async function fetchData(){
  const data = await d3.csv("/dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {
  const vlSpec = vl
  .markBar()
  .data(data)
  .encode(
  vl.x().fieldN("Platform"),
  vl.y().fieldQ("Global_Sales").aggregate("sum"),
  vl.color().fieldN("Genre")
)
.width("container")
.height(400)
.toSpec();

render("#view", vlSpec);

  //vegaEmbed("#view", vlSpec).then((result) => {
    //const view = result.view;
    //view.run();
    //document
      //.getElementById("slider")
      //.addEventListener("change", function (event) {
        //const sliderValue = event.target.value;
        //console.log(sliderValue);
        // Update the Vega-Lite parameter and rerun the view
        //view.signal("sliderValue", sliderValue).run();
      //});
  //});
});

async function render(vierID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}

//render();