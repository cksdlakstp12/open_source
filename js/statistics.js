var date = new Date();

function addZeroMonth(date) {
    if ((date + 1) < 10) return `0${date + 1}`;
    else return `${date + 1}`;
}

function addZeroDate(date) {
    if (date < 10) return `0${date}`;
    else return `${date}`;
}


am4core.ready(async function () {
    
    fetch('/api/visiters')
		.then(function (response) {
			return response.json();
		})
		.then(function (myJson) {
			let data = [];

			for (var i = 0; i < myJson.length; i++) {
				const temp = {
					"date": `${myJson[i].year}-${addZeroMonth(myJson[i].month)}-${addZeroDate(myJson[i].day)}`,
					"value": myJson[i].numOfVisiters
				};
				data.push(temp);
            }
			console.log(data);
            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart);

            // Add data
            chart.data = data;

            // Themes begin
            am4core.useTheme(am4themes_dark);
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Set input format for the dates
            chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "value";
            series.dataFields.dateX = "date";
            series.tooltipText = "{value}"
            series.strokeWidth = 2;
            series.minBulletDistance = 15;

            // Drop-shaped tooltips
            series.tooltip.background.cornerRadius = 20;
            series.tooltip.background.strokeOpacity = 0;
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.label.minWidth = 40;
            series.tooltip.label.minHeight = 40;
            series.tooltip.label.textAlign = "middle";
            series.tooltip.label.textValign = "middle";

            // Make bullets grow on hover
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 4;
            bullet.circle.fill = am4core.color("#fff");

            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.3;

            // Make a panning cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "panXY";
            chart.cursor.xAxis = dateAxis;
            chart.cursor.snapToSeries = series;

            // Create vertical scrollbar and place it before the value axis
            chart.scrollbarY = new am4core.Scrollbar();
            chart.scrollbarY.parent = chart.leftAxesContainer;
            chart.scrollbarY.toBack();

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;


		});

	
}); // end am4core.ready()