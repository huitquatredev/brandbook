var convert = require('color-convert');

module.exports = function() {

    let result=[];

    //Names of the Pantone Colors of the Year
    let colorNames = ['Very Peri', 'Ultimate Grey', 'Illuminating', 'Classic Blue', 'Living Coral', 'Ultra Violet', 'Greenery', 'Serenity', 'Rose Quartz', 'Marsala', 'Radiant Orchid', 'Emerald', 'Tangerine Tango', 'Honeysuckle', 'Turquoise', 'Mimosa', 'Blue Iris', 'Chili Pepper', 'Sand Dollar', 'Blue Turquoise', 'Tigerlily', 'Aqua Sky', 'True Red', 'Fuschia Rose', 'Cerulean'];
    //Years. Sometimes you have 2 colors the same year.
    let colorYears = ['2022', '2021', '2021', '2020', '2019', '2018', '2017', '2016', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000'];
    //The Pantone color HEX value
    let colorBaseHex = ['#6868AC', '#AAA7AA', '#F5DE4D', '#0F4B80', '#FA7066', '#5F4B8B', '#87AF4B', '#90A8D0', '#F7C9C0', '#954E4B', '#AD5C99', '#009975', '#DD3E22', '#D84F76', '#46B9AD', '#EFC052', '#595CA6', '#9A2335', '#DFCFBE', '#54B0AF', '#E05D42', '#7ECDCD', '#BC243B', '#C3467C', '#97B3D3'];
    //The Pantone color LCH value
    let colorBaseLch = [];
    for(let i=0;i<colorBaseHex.length;i++){
        let lch = convert.hex.lch.raw(colorBaseHex[i]);
        colorBaseLch.push({l:lch[0],c:lch[1],h:lch[2]});
    };
    //The pantoned color HEX and LCH values
    let lightnessCurve = [2,20,35,65,90,99];//This is the lightness values for each tint
    let pantonedLch = [];
    let pantonedHex = [];
    for(let i=0;i<colorBaseLch.length;i++){
        let pantonedLchSet = [];
        let pantonedHexSet = [];
        let deltaL = [];
        lightnessCurve.forEach(val =>{ //Each tint have the same Chroma and Hue. Only Lightness change
            pantonedLchSet.push({l:val,c:colorBaseLch[i].c,h:colorBaseLch[i].h});
            deltaL.push(Math.abs(val-colorBaseLch[i].l));
        });
        //Chroma down near the edge
        pantonedLchSet[5].c*=0.1;
        pantonedLchSet[0].c*=0.2;
        pantonedLchSet[4].c*=0.5;
        pantonedLchSet[1].c*=1.5;
        //We find the place where the Pantone color fit the best and use its lightness value
        let min = Math.min(...deltaL);
        let index = deltaL.indexOf(min);
        pantonedLchSet[index].l=colorBaseLch[i].l;
        //Convert to HEX
        for(let j=0;j<6;j++){
            let hex = convert.lch.hex([pantonedLchSet[j].l,pantonedLchSet[j].c,pantonedLchSet[j].h]);
            pantonedHexSet.push(`#${hex}`); 
        }
        pantonedHexSet[index]=colorBaseHex[i];

        //Add the tints array to the results
        pantonedHex.push(pantonedHexSet);
        pantonedLch.push(pantonedLchSet);
    };

    //Build the result table
    for(let i=0;i<colorNames.length;i++){
        result[i]={year:colorYears[i],name:colorNames[i],baseHex:colorBaseHex[i],baseLch:colorBaseLch[i],pantonedHex:pantonedHex[i],pantonedLch:pantonedLch[i]};
    }
    return result;
}
