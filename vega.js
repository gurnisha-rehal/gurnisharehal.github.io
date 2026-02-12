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

    // Rank genres within each platform
    vl.window([
      { op: "rank", as: "rank" }
    ])
    .sort([{ field: "TotalSales", order: "descending" }])
    .groupby(["Platform"]),

    // Keep only top genre per platform
    vl.filter("datum.rank == 1")
  )
  .encode(
  vl.y().fieldN("Platform").sort("-x"),
  vl.x().fieldQ("TotalSales").title("Highest Selling Genre"),
  vl.color().fieldN("Genre").title("Top Genre")
  )
.width(600)
.height(400)
.toSpec();

  const vlSpec2 = vl
  .markCircle({tooltip: true})
  .data(data)
  .transform(
    vl.aggregate([
        { op: "distinct", field: "Genre", as: "GenreCount" },
        { op: "sum", field: "Global_Sales", as: "TotalSales" }
    ]).groupby(["Platform"])
  )

  .encode(
      vl.y()
        .fieldN("Platform")
        .sort("-x"),

      vl.x()
        .fieldQ("GenreCount")
        .title("Number of Genres"),

      vl.size()
      .fieldQ("TotalSales")
      .scale({range: [50,200]})
      .title("Total Global Sales"),
  )
  .width(600)
  .height(400)
  .toSpec();

render("#view", vlSpec);
render("#view2", vlSpec2);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}