
import * as d3 from 'd3';

d3.json('data/albums.json').then((data) => {
    const svg = d3.select('body')
        .append('svg')
        .attr('width', 800)
        .attr('height', 600);

    // Example: visualize album titles as circles
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => 50 + i * 60)
        .attr('cy', 300)
        .attr('r', 25)
        .attr('fill', 'steelblue');

    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) => 50 + i * 60)
        .attr('y', 300)
        .attr('dy', 5)
        .attr('text-anchor', 'middle')
        .text((d: any) => d.title)
        .attr('fill', 'white');
});

export function createAlbumSvg(containerSelector: string, albums: any[]) {
    const svg = d3.select(containerSelector)
        .append('svg')
        .attr('width', 800)
        .attr('height', 600);

    svg.selectAll('circle')
        .data(albums)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => 50 + i * 60)
        .attr('cy', 300)
        .attr('r', 25)
        .attr('fill', 'steelblue');

    svg.selectAll('text')
        .data(albums)
        .enter()
        .append('text')
        .attr('x', (d, i) => 50 + i * 60)
        .attr('y', 300)
        .attr('dy', 5)
        .attr('text-anchor', 'middle')
        .text((d: any) => d.title)
        .attr('fill', 'white');
}

export function createAlbumSalesScales(albums: { month: string; sales: number }[]) {
    const months = albums.map(d => d.month);
    const sales = albums.map(d => d.sales);

    const xScale = d3.scaleBand()
        .domain(months)
        .range([50, 750])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(sales) ?? 0])
        .range([550, 50]);

    return { xScale, yScale };
}

export function createAxes(svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>, xScale: d3.ScaleBand<string>, yScale: d3.ScaleLinear<number, number>) {
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
        .attr('transform', 'translate(0,550)')
        .call(xAxis);

    svg.append('g')
        .attr('transform', 'translate(50,0)')
        .call(yAxis);
}

export function createAlbumSalesLineChart(containerSelector: string, albums: { month: string; sales: number }[]) {
    const { xScale, yScale } = createAlbumSalesScales(albums);

    const svg = d3.select(containerSelector)
        .append('svg')
        .attr('width', 800)
        .attr('height', 600);

    createAxes(svg, xScale, yScale);

    const line = d3.line<{ month: string; sales: number }>()
        .x(d => (xScale(d.month) ?? 0) + xScale.bandwidth() / 2)
        .y(d => yScale(d.sales));

    svg.append('path')
        .datum(albums)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);

    svg.selectAll('circle')
        .data(albums)
        .enter()
        .append('circle')
        .attr('cx', d => (xScale(d.month) ?? 0) + xScale.bandwidth() / 2)
        .attr('cy', d => yScale(d.sales))
        .attr('r', 4)
        .attr('fill', 'orange');
}