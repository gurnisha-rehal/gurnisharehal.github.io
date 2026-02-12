//Vega-lite Visualizations
  //Load data from dataset/videogames_wide.csv using d3.csv and then make visualizations

async function fetchData(){
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {
  const vlSpec = vl
  .markCircle({tooltip: true})
  .data(data)
  .transform(
    vl.aggregate([
      { op: "sum", field: "Global_Sales", as: "TotalSales" }
    ]).groupby(["Platform", "Genre"]),

    // Step 2: Rank genres within each platform
    vl.window([
      { op: "rank", as: "rank" }
    ])
    .sort([{ field: "TotalSales", order: "descending" }])
    .groupby(["Platform"]),

    // Step 3: Keep only top genre per platform
    vl.filter("datum.rank == 1")
  )
  .encode(
  vl.y().fieldN("Platform").sort("-x"),
  vl.x().fieldQ("TotalSales").title("Highest Selling Genre"),
  vl.color().fieldN("Genre").title("Top Genre")
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