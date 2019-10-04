function buildCharts1(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/country/${sample}`;

  // @TODO: Build a Bubble Chart using the sample data
  d3.json(url).then(function (response) {
    var trace1 = {
      x: response[0],
      y: response[1],
      mode: 'lines+markers',
      marker: {
        color: 'orange'
      }
    };

    var data1 = [trace1];
    var layout = {
      title: {
        text: 'Broadband access',
        fontWeight: "bold"
      },
      xaxis: {
        title: {
          text: 'Years',
          font: {
            size: 18,
            color: 'black'
          }
        },
      },
      yaxis: {
        title: {
          text: 'No of users',
          font: {
            size: 18,
            color: 'black'
          }
        }
      }
    };

    Plotly.newPlot('mydiv', data1, layout);
  })
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selectButton");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts1(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts1(newSample);
}



function buildCharts() {
  var url = `/time`;

  d3.json(url).then(function (response) {
    x_values = [];
    y_values = [];
    for (var i = 0; i < response.length; i++) {
      x_values.push(response[i].time)
      y_values.push(response[i].country)
    }

    console.log(x_values);

    var options = {
      chart: {
        height: 380,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          },
        }
      },
      colors: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC'],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff']
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },

      series: [{ data: x_values }],
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: y_values,
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        text: 'Daily time spent on the internet by young people',
        style: {
          fontSize:  '20px',
          color:  '#263238'
        },
        align: 'center',
        floating: true
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        }
      }
    }
    var chart = new ApexCharts(
      document.querySelector("#myDiv"),
      options
    );

    chart.render();

  });
}

function bubble() {

  var options = {
    chart: {
      height: 350,
      type: 'scatter',
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false
      }
    },
    colors: ["red", "pink", "orange", "blue", "yellow", "lime", "lightgreen", "green", "black"],
    series: [{
      name: 'Facebook',
      data: [
        [75,63]
      ]
    }, {
      name: 'Instagram',
      data: [
        [43, 31]
      ]
    }, {
      name: 'Linkdin',
      data: [
        [24, 29]
      ]
    },{
      name: 'Pinterest',
      data: [
        [42, 15]
      ]
    },{
      name: 'Reddit',
      data: [
        [8,15]
      ]
    },{
      name: 'Twitter',
      data: [
        [21,24]
      ]
    },{
      name: 'Whatsapp',
      data: [
        [19,21]
      ]
    },{
      name: 'Youtube',
      data: [
        [68,78]
      ]
    },{
      name: 'Snapchat',
      data: [
        [24,24]
      ]
    }],
    title: {
      text: 'Percent of men and women using social media platforms in the US, 2019',
      style: {
        fontSize:  '20px',
        color:  '#263238'
      },
      align: 'center'
    },
    xaxis: {
      title: {
        text: 'Women(%)'
      },
      style: {
        fontSize:  '20px',
        color:  '#263238'
      },
      tickAmount: 9,
      min: 0,
      max: 90
    },
    yaxis: {
      title: {
        text: 'Men(%)'
      },
      style: {
        fontSize:  '20px',
        color:  '#263238'
      },
      tickAmount: 9,
      min: 0,
      max: 90
    },
    markers: {
      size: 20
    },
    fill: {
      type: 'image',
      opacity: 1,
      image: {
        src: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFk6h-UUAZJodgPWTAv4ZrEb448Xpl7UM2XRMb0hYBmW-5Riqeg', 
        'data:image/jpeg;base64,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',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8Al9MAlNJnueEAktGr0uv4/f4ootgAj9AAk9EAkNDj8fnl8/mj0OoaoNf1+fzY7fd4wOQAmtS93fCJyOduveJcs95Jq9x6weTq9/zL5/TE5PSl1Ozx+/2SyecxoNdAptiaz+rS6vW03O+r2e5ltN+q732cAAADwElEQVR4nO2d63KiMBhAJWQRUrR4v1VXsfv+r7iow1aCaN2BxKTn/HJMDJyBkC8XSa8HAAAAAAAAAAAAAAAAAAAAAAAAAAAA32E1mc5CQ0wnK+N+2TxQiTBFooJ5ZlZwFIvALCIeGfR7XyjDfifU4t2Y4SKxIBgEycKU4MjGFTyhlmYEs9iSYBDEZh43c9MPmS/E3ITgyprfCRPt4sRWLTyhJgYMp3YepBeSqQHDmb1qWFTEmQHD0KphiCGGGGKIIYYYYmjG8DR05LOhTPrhbD6U0lPDZPyxPefKlp1cSOuGMtz+y5cPO1C0bZhUjr8de2co+tWcWft9ZcuG8VrLOmr9cWPZsK9nzVqviXYNk10t72+/DNWxlrf1oVXLhno17CDCs2y4qeX17BrKj1revV+G9UmFtGU/24ZBrE8qDHxrD/XDR+2HbbbjUlWtifP2e1C2DasPm7CDSSrrhkX3qayLm30Xc1T2DQMh5oPN5rjry05GMl7AsDgJqZTqao7xJQw7BcMXNXyiQOcMT0vyhv39vj+W6lvF2jYUcYWv9lAodfV1uepPysVunW6jIvpZZZ+z8TckbUdts+j9mrcyahOjSkI0OhWRJLtqHBttFg9XPFo2lL+qOaN+maD1qz6KcC5ZRvWy8/2DQM8Vw0ERDtS7y2em90M9ZwzV8K2p+MPddYEvazioJgxE2lz+8t6N6orhoeEWvXBv6MMVw/sLDNd3LqIrhg9Y3Glx/TCcNF9ETwzvjO94YvjEYFcntNAePuLYeJu+rOHtaxit8jy9Ebv10sZW3ynDPBzHRZdjHN74h4F7d+kNw2k5VCVFfVausdF3yHB6dSPKXE9tXEvujmF+3YUQtf8z7ZrG6twxrE4sSr0qHpoeps4YatNu8qClfzhveKz2c8UfLf3TeUP9fzf6OpXPpp6+M4YjvQwt3X3DP1oZSkt331DvAcZauvuGesyiGx6dN+xrv8QQw3bB8IufbDjEEMNOacEwwrDxrQbeGG4w7BQMr0QwxBDDjjAR0/wAw6bpNW8M184YlhNoz/YPnTEsh9Rqs9wPDV2ph94b9v7bMH9RQzFapWn6dqH4lI0fJZSoLL1m9aqza+c3Ygh54fSpmiDK70X9/GVQfSVr4xFcW8n+NBhiiCGGGGKIIYYYYoghhhhieDY08T5v/9/J7v979f3fG8H//S1+wB4l/u8zY22vIGlsryBr+z1tH59aaywt7Nll7Ba94P2+az2je+fNbOydBwAAAAAAAAAAAAAAAAAAAAAAAAAA4CZ/AdtsXyuxMRRGAAAAAElFTkSuQmCC',
        'data:image/png;base64,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',
        'data:image/png;base64,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',
        'data:image/png;base64,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',
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhAQEBAQEBUQEA8QFhUQEBAWDxUVGBEXFhURFxUYHSggGBolGxYVIT0hJSkrLi4uFx8zODMtOCguLisBCgoKDg0OGxAQGy0lICUtLy8vLystLS8tLi0tLS0tLS0tLS4tLS4tLS0tLS0rLS0rLy0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAAAQIDBAYHBf/EAEcQAAEDAQQFCAcFBQYHAAAAAAEAAhEDBBIhMQUGQVFxEyIyYYGRobEHFEJScpLBYoKiwtEjU9Lh8CQzQ2OjskRzg5Oz4/H/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFAQYC/8QANBEBAAIBAgMDCwMFAQEAAAAAAAECAwQREiExBUFREyIyYXGBkaGx0fBCweEjM0NS8RVi/9oADAMBAAIRAxEAPwDuKAgICAgICAgICAgICCC4bwgi+N470EyglAQEBAQEBAQEBAQEBAQEBAQEBAQEBBbqV2jCZO4Yu7ggo5R5yaG9bzj3D9UDknHOo77oAH1Pigj1Zu0E8XOPmUE+rU/3bPlagerM/ds+VqCPVWe4B8OHkgerR0XPbwcT/ulAioMnNf8AEC094nyQPWo6bXM6zi35hl2oL7XA4gzwQSgICAgICAgICAgICAgICAgt1KoGGZ3DNBRdc7pG6NzTj2u/RBWxgbgABwQVICAgICAgICAgsOswzYSw/ZyPFuRQOXLP7wYe+3o9o9ny60GQDOSCUBAQEBAQEBAQEBAQEFg1C7BuA2u/h38UFVNgbltzO08SgrQEHj6S1ms1CQ6qHuHsUue6dxjAHiQq2XV4sfKZ5+EK2XV4sfKZ5+prts18eZFGg1u41XEn5Wx5qlftKf0V+P2/lSv2lP6K/H8/d5NfWq2P/wAa51U6bAO8gnxVW2uz2/Vt7IhWtrc09+3sYdTTFpdnaa/ZVe3yIUc6jLPW0/FFOoyz+qfipGlLQP8AibR/36v8S+fLZf8AafjLnlsv+0/GWRS1htbcrTU+9dd/uBUkavNH6p+SSNXmj9UvRs2u1pb020qo62lru8GPBT07Ryx1iJ+X58E1O0csdYifz87nuWDXig+BVa+id8X6fe3HwVvH2jjt6UbfOFzH2jjt6XJsdmtTKrb9N7ajTtY4EeCvVvW8b1neF2t62jes7ry+n0IMc0SzGn2sPRPD3T4eaC9RrB+WBGBB6QO4hBcQEBAQEBAQEBAQEGOTf+Hxd/LzQXEErg8bTustGyc1x5SpGFNhF7qLjk0ccdwKrZ9VTFynnPgrZ9XTFynnPg0LS2sdotMhz+TYf8OnIbH2jm7tw6lkZtXky9Z2jwhj5tXky9Z2jwh5TQqysqBR1MoEoEoEoEoKSguWW01KLr9J7qbt7DE9RGRHUV90vak71nZ9Uvak71nZuGhdecmWtsbOVYMPvs2cR3BaeDtDuyfGP3aeDtDuyfGP3bnRrNe0PY5rmuEhzSC0jeCM1pxaJjeGnFotG8K5XXVmtSmHNN1wyP5TvCCuz170gi65uY+o3hBeQEBAQEBAQEBBjvdeMeyM+s7uCCqUCUGj6z65YmjZHDc6sMeyn/F3b1l6rXfpx/H7fdlarXfpxfH7fdpc5kkkkkkkySTmSdpWUy1QKOJlcCUC8gXl0Ly4F5AlAlBEroglB6OhNO1bG6WG8wnnU3HmHrHuu6x2yp8Govhnl08FjBqL4Z5dPB0zQ+lqVqpipSPU5p6bD7rh/QK3cWauWvFVu4c1MteKv/GdKlSrdanMObg5uR2fCeooLtnrXxORGBBzB3ILqAgICAgICCzXf7IzOZ3D9UFIEYBBKDnuumtJqF1ms7uYJbUe09M7abT7u87css8jWavinydOnf6/Ux9bq+L+nTp3+v1NRas5mqry4JvIF5AvIF5AvIF5AvIF5AvIF5AvIKSV0ZWi9J1LLUFWkYORB6D2+64f1CkxZbYrcVUuLLbFbiq6voXS1O10hVpnqc09JjtrT/WIgrfw5a5a8VXoMOauWvFX/jOUqVZq8w8oNmDhvbv4jy7EGY0ziNqCUBAQEBBD3QCTsxQYzdpOZxP0CCqUGn6/aw8i31Wi6KlRsvcM2UzsB2Od4Cd4VDW6jgjgr1n6M7Xangjydes9fVH8udtwWMxlUoJvIIL0FPLDeO8I5xR4q7yOl5AvIF5AvIF5AvIF5AvIIlBEoPS1d026xVhUEljobUaPabOY+0JJHaNqsafPOK+/d3rGnzzhvxd3e67QrNe1r2EOa9oc0jIgiQQt+JiY3h6GtotG8LkrrqiyOuk09nSbw2t7D4EIMtAQEBAQWLQ6SG7ucfoP63IKEGHpjSLbNRqV35U2zG1zjg1g6ySAvjJkjHWbT3I8uSMdJtPc4vabU+s99Wobz6ji5x6zsHUMo3ALzt7Te02nvebvab2m1usqQ5fL5VXkF2yUH1XspU2l76jg1rRtP0AEmdgBX1Sk3tFY6vqtZtaK16y6tq/qlQszWl7GVqubqj2ggHcwHojxO1beDS0xx03nxbuDR48cc43nx+z2nWKkQQaVIgiCDTbBG7JWOCvgs8FfByXXHRIslpcxginUAq09wBMOZ2HwLVh6vD5PJy6SwdXhjFk2jpPOHiXlWVS8gXkC8gXkC8gXkC8gXkEXkFLig3r0bab6VjefeqUp730/zfMtTQZv8c+5q9nZ/wDFPu/eP3b6tNqrdoBgOGbDeHXvHaJ8EGYxwIBGREoKkBAQEGGHTJ3mezZ4IJQc49J2lr1SnZGnCmBVqfG4cxp4Nk/fCyu0Mu8xSPbLI7Ry72jHHdzlpYKzmYkOXBN5B0b0YaKAY+2OHOeXUqfUxp55HFwj7nWtbQYtq8c97X7Ow7VnJPfyhvcrRaZKDVPSRo3lrLyzRLrMeU6+TOFQcAId9xU9bj48e8dY/JUdfi48XFHWPp3/AHcpvLEYZeQLyBeQLyBeQLyBeQLyBeQReQV2W1uo1KdamYdTe144g5HqOXAr7paaWi0dz6peaWi0dYdwsNrbWp06zOjUY143wRMHrXoq2i1YtHe9NS8XrFo71+V9PpNgMXme4cPhOI7suxBlICAgt2h0NPXh34IMZBDngAkmAASTuAzKG+zhGkLcbRWq13TNWo5+OwE81vY2B2LzuW/HebPM5L8d5t4rQKjRplAvIO3aq0rljsjRh/Z6TjxcwOd4kr0OCNsdY9T0mmrtirHqh6kqVMSgpqNDgWuAIcC0g5EEQQkxu5Mb8pcM0zYDZa9Wzun9m8gE7WHFju1pHbK87mx+TvNXm82Ocd5p4MKVGiJQJQJQJQJQJQJQJQJQUuKDpnov0jfs9SgTjZ6kj4KkuH4g/wAFsaC++Ph8G12dk3xzXw/f8luUq80EUzFRp95paeIxH5kGcgICDHtZ6I657h/8QWUHh672vkbDaXDN1Pkh/wBRwYfBxPYoNTbhxWlX1d+HDafzm4wwrBedVgrgm8gSg7fqrXv2OyOBn+z0Wni1ga7xBXocE746z6npNPO+Ks+qHqSpUxKBKDjGuulWWq11KlMgsYG0WuGTw2ZfwJJjqAWHq8kXybw8/rMsZMszHTo8O8qqqXkC8gXkC8gXkC8gXkC8gSgglBtPoytly2GnOFai9sb3Nh4PcH96vaC22Tbxhf7Pvtl28YdXWw21usYuu917D4wfAlB6SAgIMW1HEcD5j9EFpBpfpWrXbJSaPbtLJ4Cm8+d1UtdP9Pb1qHaM/wBKI9blzSsdiKwUEygSg6b6LtJ36FSzE40Hl7fgeZ8H3vmC19Bk3pw+DZ7Oyb0mnh9JbtKvNElBofpG1ldTmxUpaXsDqr8jcdMU28QMTuMbTGfrdRNfMqzddqZr/Tr73N5WUx0ygSgSgSgSgSgSgSgSgSgpLkHp6pV7lusjt9drPn5n5lY007ZarGltw5qz63cFuvRLdp6D/hce4Sg9JhkDgEEoCDEtXS+6PMoLSDQfS479lZRvq1D3MH6qhr/Qhm9pehX2ubNKymOrBQJQJQelq7pd1jtFOuJIEte0ZupnpN45EdbQpcGXyV4sm0+acV4s7fQrtqNa9jg5r2hzXDIgiQQt6JiY3h6OJiY3hXK660v0j6ANamLVSE1KDYeBm6lnPFuJ4F3UqWswcdeKOsM/Xafjrx16x9HL5WQxSVwJQJQJQJQJQJQJQJQJQQSgytCui02U7rTZz/qtUuH+5X2pcP8Acr7Yd7XoHpVFXou+E+SDPodFvwjyQXEBBiWrpD4fr/NBaQaH6XGfsLM7dXcO+mT+VUdf6Ee1ndpR5ke1zRoWSxlQCBC4EIEIN89G2sNxwsVV3NeSaJPsvOJpcHZjrkbQtLRZ/wDHb3NTQajb+nb3fZ0qFptYhByfXzVX1VxtFFv7B7sQMqTicuphOW44bpyNXpuCeOvT6MTW6Xyc8den0ajCoqBCBCBCBCBCBC6ELgQgQuiCFwZmgGXrXZBvtVn/APK1TYP7lfalwf3a+2HelvvSqK/Rd8LvJB6FEc1vAeSCtAQY1rGLeBHl/NBYQan6T7NfsJd+6rUqneTT/Oqmtrvi38FLtCu+HfwlyZoWMwlYC4JhAhAhAAjEEiMZBgg7wV2J2InZ1zUfWUWynyVUjl6TcdnKNGHKjrykb8dq2tLqPK12nrDe0ep8rXa3pR+btohWlxTVote1zXNDmuBaWuALSCIIIOYXJiJjaXJiJjaXL9bdRn0L1aytdUpZlgk1afDa9niNs5rK1GjmvnU6MfU6Gaedj5x4eDTAFQZyYQA2cACZgADEk7ABtK7HMjm6ToX0d0jQabVygrPEkMeAKc5NGBBI2kyJWri0NODz+rYxdn04PP6/R42m/R7aKMus5FpZndwbXHZk7sM9Sgy6G1edOavm7PvXnTn9WoVKZaS1wLXNMFrgQ4HcQcQqMxMTtKhMTE7SiFxwhAhBSQg9vUSz37fZhGDXPqHqu03EHvjvVrSRvlha0Vd81XaVtvQLVoHNI383vMfVB6YCCUBBZtQwB3EeOH1QYyDA0/YfWLNaKIzqUnhvxRLPxAKPLXipNUeanHjmvjDhVJeeeZXAFwTCBCBCBCC7Za76T21Kbyx7Dea4Zg/UbI2gkL6raazvHV9Vtas71nm7BqlrMy3Mgwyswc+nsIy5Rk5t8pg7CdzT6iMsetvabVVzR6++GwQrC0Qg1jWHUiz2omoz+z1TiXMAuOO97MiesQeKq5tJTJz6Sp59Fjy845S57pfVC12Y86kardj6AL29oAvN7RHWs3JpMlO7f2MvLpMuPu3j1Nq1A1RLCLXaWFrhjSpvEFv+a4HJ24HLPOIt6TS8Pn369y7otJw/1L9e6P3b/C0WmQg87TGgrPaxFek15AgPGFVvB4xHDJR5MVMkbWhFlw0yRtaHNdbdTHWJvLU6nK0rwabwAqsJymMHCcJEZjDasrU6TyccVZ5MjVaOcUcUTvDVYVJRIQUkLo3b0U2Ka1ornKnTbSG6XuvHtAYPmWj2fTnNmn2bTe1re50tajXUkS5jd7gewCfOEHooCAgpqNkEbwQgwwglBxbW7Rnq1srsAhr3cszddeSYHUHXm/dWDqsfBlmPe89qsfk8sx7/AIvKDVXVkwgQgQgQgQgu2as+k9tSm4sew3muacQf62ZFfVbTWd46vqtprPFHV1LVPXOnartGvdpVsANlKqfsnY77J7J2bGn1dcnK3KW1ptbXJ5tuU/VtsK4vEIEIEIEIEIEINQ9J9cNsbWbatem0cGgvJ/CO9U9dbbFt4yodo22xbeM/y5VCxWIEIKHBB17UPRnq9jpyIdWmu7fzgLo+QN7ZW7pMfBij183oNFj4MUb9Z5tiVlaLM2Xk+4272nE+F1BmoCAgIMWo2HEb8R9fHzQQg0/0kaH5Wg20NEus83ozNI9LuMHheVHXYuKnFHd9Gf2hh4qccdY+jmYCx2KkNXBN1AuoF1AuoF1BBYg2zV7XivZ4p1ptNMYc4/t2jqeekOp3eFew661OVucfNewa69OVucfN0LQ+sNmtccjVbej+7fzao+6c+IkLTx58eT0ZauLUY8voz7u96sKZOQgQgQgh5ABJIAAJJJgADMkoTOzkWvWnm2ys0UsaVAOa0++4kXn8MABwJ2rE1meMltq9IYOs1EZb7V6Q1q6qamghdHp6saI9btNOkRzAeUqf8tpEjtMN+8p9Ni8pkiO7vWNNh8rkivd3+x2mFvvRIcYBJyAJQXbGyGic3S48Ts+iC+gICAgtWhuE7sezaEFpBDmggggEEEEHIg5goTG7j+s2gzY65pieTdL6RO1s9Gd7cu47VganD5K+3d3PO6nB5G/D3d356nlBqrq5dQLqBdQLqBdQLqBdQCz9UHu6L1rtlngNrGo0ezXl4+abw74VnHrMtO/f2rOPWZqdJ39vP+W1aP8ASLTMC0UKlM+9SIeziQYcOwFXado0n0o2XsfaVZ9Ou3s5vYZrnYSJ9YjqNKsD3FqsRrMP+yzGtwT+r5Swrd6QLKwHkhVrnZDCxvaXwQOAKjvr8UdOaK/aOKPR3n5fVpGn9ZrRbOa8inTn+6pzdO6+c39uHUs7Nqr5eU8o8Gbn1WTNynlHh+dXiXVWVkXUFDgg6xqToL1ShLxFWtD372iObT7AT2krd0mDyVOfWerf0en8lTn1nr9mxK0trbm3nBmzBzuAOA7T5FBnICAgICAgxKWR3EmOE4IKkHPfSTbb1WlQGVJhqO+J+AHY1s/eWR2jk3tFPBj9pZN7xTw/f8+bTw1ZzNTdQRdQTdQLqBdQLqBdQLqBdQLqBdQLqCIQIR1SQjjcdQtW77m2ys3mNM0Wn2nD/FI3DZvOOwTp6LTbz5S3u+7S0Om4p8pbp3ff7OhrVbCmo66CTs7+CC7ZaRaJPScZP0HYEF5AQEBAQWrQ6GmMzzRxOCCgNjAbMEAkDE4AYoOM6UtfrFatW/ePLh8OTB8oaF5vLk47zbxeZy5PKXm/j+R8mOGqNGm6uBdQLqBdQLqBdQLqBdQLqBdQLqBdXREIKSEGz6paqG0FteuCKObWnA1f0Z17eGKv6TScfn36fX+F/SaOcnn39H6/x9XSWtAAAAAAgAZAbgFsttKC3RbfN72W9HrPvcNyDLQEBAQEBBYqmXAe6L3acB9UEoPC12t3I2SrBh1WKLd/P6X4Q49iq6zJwYp9fJU1uTgwz6+Xx/hy1iwGArhBXQoOqG6xrnu3MaXO7gu1ibTtWN31Ws2nasbsq3aIr0GtfWovY12RMEcDBN09RhSZMOTHG9q7PvJgyY43tGzChRIkwgQgmECECECEEQgQgiECnTc9wYxrnucYDWglx4ALsRNp2jq7ETM7Q3fVzUoNirawHHMUcCwdbzk49Qw4rV0+g287J8Pu1dNoNvOy/D7/AJ8W6wtNqCC1HKGB0Rmfe+yOpBlAIJQEBAQEBBj0cZd7xJ7Mh5T2oLkIOd+kKtUtFppWWhTqVeRZfeKbXOh7+jejKGicffWXruLJaKVjfZk6+bZLxSsb7fux9G6jWqpBqmnQH2jfqfK3D8Sgp2flt6XL5/nxRY+z8tvS5fOfz3tosGpNmpwal+uftmGfK2PGVdx6DFXrz9q7j7PxV682wWezMpi7TY1jRsY0NHcFcrWKxtWNlyta1jasbKnsDgQ4AgiCCJBG4jauzG/KXZiJ5S1bS+pFKpLrO7kXe6ZNI8NreyR1LPzdn0tzpy+n8fnJn5uz6W505fRp+kdBWmzzylJ10e2znU+MjLthZuTTZcfpR746fntZuTTZcfpR8On57XnNdKgQKkBBKCEESgrs9F9V12mx9R25jS49sZBfVazedqxu+q1m07Vjdsmi9R61SDXcKDfdbDqp/K3vPBX8XZ97c78vqvYuz72535R8/t9W66J0NQsoijTDSRBccajuLj5ZLTxYaYo2rDUxYKYo82Puz4UyZBQWgDUykM37XdQ3BBktaAIGACCUBAQEBAQWrQ6GmMzDRxOCCoCIA2YICAAgICAgBAQEHn23QVmrSalCmSfaAuv+ZsFQ5NPiv6VYQ30+K/pVh49o1Fszug+tT6g9rh+IE+KrW7OxT0mY/PWrW7OxT0mY/PWw6moA9m1OHxUQfJwUU9mR3W+X/EU9mR3W+Sgej87bX/of+xfP/mT/AL/L+XP/ADP/AL+X8silqDS9uvWPwhjfMFSR2bTvtPyfcdm077T8npWXVGx08eS5Q/5rnOHy9HwU9dDhr3b+1PTRYa92/te1QoNYA1jGsaNjGgN7grVaxWNoharWKxtEK110QUVKoGGJO4Z/y7UECiXYv7GjojjvKC+gICAgICAgILL8Xge6L3acB4SguICASgs+st9mX/AJHfl4oH7Q+6zjznfoPFBPqoPSJf8AEcPlGCCrkY6PN6h0e5BF8jpN7W4juzQVteDkQeCCUBAQEBAQEFo1xslx+zj45IF1zszcG5uLu/Z2ILlOmG5CPM9ZO1BWgICAgICAgICCxSOBeTF4k45RkPAT2oI9YB6Ic/4Rh8xwQLtQ7Ws4c53ecPBBIsrc3S8/bM9wyCC+AgICAgIKH0gcwPr3oKeS3OcOMHzQLr97T2EfVBEv91vzn9ECX+635z/Cgc/cwdpP6IHJuOb4+Fo+soJ9Xbtl3xEnwyQXAEEoCAgICAgICAgICC16u2ZiSMpxjhOSC6gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIP//Z',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX/////AAD/wMD/ior/3t7/+Pj/ubn/zc3/k5P/sLD/4uL/ycn/xcX/jo7/l5f/nJz/WFj/0ND/paX/8fH/6ur/oKD/2dn/tLT/Njb/Gxv/SEj/TU3/9fX/e3v/5eX/gID/Zmb/UlL/JCT/EBD/XFz/q6v/PT3/MzP/dHT/YmL/bm7/dXX/Fhb/KSn/goL/SUlInO4qAAAETUlEQVR4nO2c2VbiQBRFQwgZGZNAkElQcaLR//+7BhwaId1q7rlUSZ/94pur9gpJVd3JcQghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghpJHls9gb9IKm6/tFFEXLtN9ph2Gr1apv2fwNw3anny6jqCh8txn0Bl48y7OG6ZWX0si8oFn02/XVvDseXtTEXAzH3fm01U6LpOeZlM6DqLVaXMmNPuNqMQ2jYHZau159pG92yO3Uz06j1+hcn17vlZF/AsHUmN6Oa1fZL7s1K7hhofrxGZjW2+HpCQam3V7paQl6ps3eiXUEG6a99tB5F29Ma+0x1xB0TVt9IFAwPMEB7Rvc4QXteoQaD3FsWumAOVpwYtroCLShb1roCPTP9Mm00BFtsOHQtNARC7ChaZ8SsIKxaZ0ScqihbbvhlgRq2DetU0IKNbw3rVPCFGq4MK1TQhdqaNqmjOuzN4RuF7lpmVKQ24U9EZp9kDG3pmAdehHyJtBQcrNICpjSAQXQULLhu45Th0l9oAM0lCxxm2jIuzCtPepAw6lgHS+plEAhkIU81DwI1vGWLMInrW6AhpKE6Hs6rCH5JZQxAhpKbvh7Cb8YG7BDxkwlL9GHlKaL3B0vgIaSdRwkbTsovxr0YCpZxmFaevKIErTV0HEGqFQ5TlCUOSwrLQDFl3FZxAxt6DghwhB3fZrhDZ1Mcop4BZfsFl0P/1oA07uTGg5ghqIik3+U+ERnb+g0ZPcqXNVJT8tQeK/6EYaOk1SvScWlEEW1UJ+X2lW+V+EME13DyvcqXG5GEmr7iuHmXvVc5V/jgm2i3NoXC0KrfFVxtab6zzCbV/nXuGeo/R5WPaXi3kPlb2nlmwbuW6q6Hwpuiz9ixxfd+H+CoSxqY//JWxp5wxnq3A89ceMNLoGoccefrKR+tRquGUohTgMp0MH1QcFjbc1fCEFkxT7WcIZKX+AEoYbAFJSdhsg0ItAQlnsShCyOWQMNQfnDfIGS2zEEGmJywOha8WegoaTl6c1wCTN7Yw40BNRirGFi71wCDcX1NCp9by2goeSSo1cThSyDlpSm6dW1IVvXJeFEvdpEZLG+nfWlyG5gO2uEoUMkTMuUghS00hBZEmVfB+kWZGmi4+DqmHAgjzTYajQU2L6n8+9dO//+Qxs/plhBC/uAx2DDS9NCR4RgQ/v68bEfmv9hpoJ1pxrsiWaLbTuiwlQzu+bTYI/dL9j1EFWG79k0JwrZEPQHm2Z9Kc2ItCdaozEHa4eo6gSI4gRMO+YmIjucj5iY3/jX2uNo1SLYXwQ9PKmMpbgTpDrh5ASCG+L0AVMu8i2eW2qf0FIanp8+Pd6ewPRqsQqjAByz+A6TfJC4y05Yv3/ojtaAPMxuoPeq3k6LZhBbOsV8ks/i7VD2pOn6RfHZTHbfTeweyk4IIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIOS2/AVULWYZ4prjGAAAAAElFTkSuQmCC',
        'data:image/png;base64,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'
        ],
        width: 40,
        height: 40
      }
    },
    legend: {
      labels: {
        useSeriesColors: true
      },
    }
  }

  var chart = new ApexCharts(
    document.querySelector("#bubble"),
    options
  );
  chart.render();
  // var x_values = [75, 43, 24, 42, 8, 21, 19, 68, 24];
  // var y_values = [63, 31, 29, 15, 15, 24, 21, 78, 24];
  // var trace1 = {
  //   x: x_values,
  //   y: y_values,
  //   text: ["Facebook", "Instagram", "Linkdin", "Pinterest", "Reddit", "Twitter", "Whatsapp", "Youtube", "Snapchat"],
  //   mode: 'markers',
  //   marker: {
  //     color: ["red", "pink", "orange", "blue", "yellow", "lime", "lightgreen", "green", "black"],
  //     size: x_values
  //   }
  // }
  // var trace2 = {
  //   x: [0, 20, 40, 60, 80],
  //   y: [0, 20, 40, 60, 80],
  //   mode: 'lines'
  // }

  // var data1 = [trace1, trace2]
  // var layout = {
  //   title: 'Percent of men and women using social media platforms in the US, 2019',
  //   fontWeight: "bold",
  //   size: 24,
  //   height: 500,
  //   width: 800,
  //   showlegend: false,

  //   xaxis: {
  //     title: {
  //       text: 'Women(%)'
  //     },
  //   },
  //   yaxis: {
  //     title: {
  //       text: 'Men(%)'
  //     }
  //   }
  // };
  // Plotly.newPlot('bubble', data1, layout);
}


function multi_line() {
  var url = `/social`;
  d3.json(url).then(function (response) {
      var data = response;

      var options = {
        animationEnabled: true,
        zoomEnabled: true,
        theme: "light2",
        title: {
          text: "Social media use"
        },
        axisX: {
          title: "Year",
          valueFormatString: "YYYY",
          interval: 1,
          intervalType: "year"
        },
        axisY: {
          title: "Users",
          valueFormatString: "#,###,,.##M"
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          verticalAlign: "top",
          horizontalAlign: "center",
          dockInsidePlotArea: true,
          itemclick: toogleDataSeries
        },
        data: []
      };

      function toogleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }

      function setChartData(ungroupedData) {
        var groupedData = [],
          flags = [],
          output = [],
          l = ungroupedData.length,
          i, groupedData = [], colorIndex = 0;

        var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
          '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
          '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
          '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
          '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
          '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
          '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
          '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
          '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
          '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

        for (i = 0; i < l; i++) {
          if (flags[ungroupedData[i].social_site]) continue;

          flags[ungroupedData[i].social_site] = true;
          output[ungroupedData[i].social_site] = {
            name: ungroupedData[i].social_site,
            type: 'line',
            showInLegend: true,
            markerType: 'square',
            color: colorArray[colorIndex++],
            xValueFormatString: "YYYY",
            dataPoints: []
          };
        }

        ungroupedData.forEach((item) => {
          var year = item['Year'];
          var userCount = item['active_user'];
          var site = item['social_site'];

          output[site]['dataPoints'].push({
            x: new Date(year, 0),
            y: userCount
          })
        });

        for (const [key, value] of Object.entries(output)) {
          options.data.push(value)
        }
        $("#chartContainer").CanvasJSChart(options);
      }
      setChartData(data);
  })
}



// Initialize the dashboard
init();
multi_line();
bubble();
buildCharts();
