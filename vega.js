//Vega-lite Visualizations
  //Load data from dataset/videogames_wide.csv using d3.csv and then make visualizations

async function fetchData() {
  const wide = await d3.csv("./dataset/videogames_wide.csv");
  const long = await d3.csv("./dataset/videogames_long.csv");

  return { wide, long };
}

fetchData().then(async ({ wide, long }) => {
  const vlSpec = vl
  .markCircle({tooltip: true})
  .data(wide)
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

  .width("container")
  .height(400)
  .toSpec();

  

  const vlSpec2 = vl
  .markRect({ tooltip: true })
  .data(wide)
  .transform(
    vl.aggregate([
      { op: "sum", field: "Global_Sales", as: "TotalSales" }
    ]).groupby(["Platform", "Genre"])
  )

  .encode(
    vl.y()
      .fieldN("Platform")
      .title("Platform"),

    vl.x()
      .fieldN("Genre")
      .title("Genre"),

    vl.color()
      .fieldQ("TotalSales")
      .title("Total Global Sales")
  )

  .width(600)
  .height(400)
  .toSpec();


  const vlSpec3 = vl
  .markLine({point: true, tooltip: true})
  .data(wide)

  //Remove N/A years
  .transform(
    vl.filter("datum.Year != 'N/A'"),
  )
  .encode(
    vl.x().fieldN("Year"),
    vl.y()
      .fieldQ("Global_Sales")
      .aggregate("sum")
      .title("Total Global Sales"),

    vl.color()
      .fieldN("Genre")
      .title("Genre")
  )
  .width(600)
  .height(400)
  .toSpec();

  const vlSpec4 = vl
  .markBar({ tooltip: true })
  .data(wide)
  .transform(

    vl.filter("datum.Year != null"),

    // Select 3 publishers
    vl.filter(
      "datum.Publisher == 'Nintendo' || " +
      "datum.Publisher == 'Activision' || " +
      "datum.Publisher == 'Electronic Arts'"
    ),

    // Aggregate per Publisher + Year
    vl.aggregate([
      { op: "sum", field: "Global_Sales", as: "TotalSales" }
    ]).groupby(["Publisher", "Year"])
  )
  .encode(
    vl.x().fieldO("Year").title("Year"),

    vl.xOffset().fieldN("Publisher"),

    vl.y().fieldQ("TotalSales")
      .title("Total Global Sales"),

    vl.color().fieldN("Publisher")
  )
  .width(700)
  .height(400)
  .toSpec();

   const vlSpec5 = vl
  .markBar({ tooltip: true })
  .data(long)
  .transform(
    // Aggregate total sales per platform + region
    vl.aggregate([
      { op: "sum", field: "sales_amount", as: "TotalSales" }
    ]).groupby(["platform", "sales_region"])
  )
  .encode(
    // Platforms on Y-axis
    vl.y()
      .fieldN("platform")
      .sort({ op: "sum", field: "sales_amount"})
      .title("Platform"),

    // Sales on X-axis (stacked)
    vl.x()
      .fieldQ("TotalSales")
      .stack("zero")
      .title("Total Sales (Millions)"),

    // Color legend for regions
    vl.color()
      .fieldN("sales_region")
      .title("Region"),
  )
  .width(700)
  .height(500)
  .toSpec();

  const vlSpec6 = vl
  .markCircle({ opacity: 0.7, tooltip: true })
  .data(long)
  .transform(
    // Aggregate total sales per platform + region
    vl.aggregate([
      { op: "sum", field: "sales_amount", as: "TotalSales" }
    ]).groupby(["platform", "sales_region"])
  )
  .encode(
    vl.y()
      .fieldN("sales_region")
      .title("Region"),

    vl.x()
      .fieldN("platform")
      .sort("-size")
      .title("Platform"),

    vl.size()
      .fieldQ("TotalSales")
      .scale({ range: [0, 1000] })
      .title("Total Sales"),

    vl.color()
      .fieldN("sales_region")
      .legend(null), 

  )
  .width(700)
  .height(500)
  .toSpec();


  const vlSpec7 = vl

  .markBar({tooltip: true })
  .data(long)
  .transform(
    vl.aggregate([
      { op: "sum", field: "sales_amount", as: "TotalSales" }
    ]).groupby(["genre", "platform", "sales_region"]),
    vl.filter(
      "datum.platform == 'PS4' || " +
      "datum.platform == 'X360' || " +
      "datum.platform == 'Wii'"
    ),
  )

  .encode(
    vl.y()
      .fieldN("genre")
      .title("Genre")
      .axis({ grid: false }),

    vl.x()
      .fieldQ("TotalSales")
      .title("Total Sales (Millions)")
      .axis({ grid: false }),

    vl.color()
      .fieldN("platform"),

    vl.row().fieldN("sales_region")
    .title("Region")

  )
  .width(700)
  .height(350)
  .toSpec();

render("#view", vlSpec);
render("#view2", vlSpec2);
render("#view3", vlSpec3);
render("#view4", vlSpec4);
render("#view5", vlSpec5);
render("#view6", vlSpec6);
render("#view7", vlSpec7);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}