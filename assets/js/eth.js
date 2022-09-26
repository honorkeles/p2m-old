// [Data Javascript]
// Project: Pool2Mine Frontend - Responsive Pool Template
// Should Be Included In All Pages. It Create Data and Charts

// Pool Links
var mainWeb = "https://pool2mine.net/";
var WebURL = "https://qrl.pool2mine.net/";
var API = "https://api.pool2mine.net/api/";
var stratumAddress = "stratum+tcp://us.pool2mine.net";

// Coin Data
/* var currentPool  = "eth";
var coinTicker   = "ETH";
var baseReward   = 2.000;
var coinWeb      = "https://ethereum.org/";
var coinGit      = "https://github.com/ethereum/go-ethereum/releases";
var coinLogoPath = "assets/images/"; */
var currentPool = "qrl";
var coinTicker = "QRL";
var baseReward = 5.0163;
var coinWeb = "https://www.theqrl.org/";
var coinGit = "https://github.com/theQRL/QRL";
var coinLogoPath = "assets/images/";

// Coingecko
var geckoAPI = "https://api.coingecko.com/api/v3/coins/";
var geckoCOIN = "quantum-resistant-ledger";

// Social Media Links And Other Data
var discord = "https://discord.gg/NRX6m35";
var telegram = "https://t.me/pool2mine";
var twitter = "https://twitter.com/clouddatatech";
var facebook = "https://www.facebook.com/pool2mine";
var donation = "0xCd7B9E2B957c819000B1A8107130F786636C5ccc";
var poolname = "POOL2MINE";

// Store Pool Links
console.log("CyberCore.WebUI  : ", WebURL); // Returns website URL
console.log("API address used : ", API); // Returns API URL
console.log("Stratum address  : ", "stratum+tcp://" + stratumAddress + ":"); // Returns Stratum URL
console.log("Page Load        : ", window.location.href); // Returns full URL

// Check Browser Compatibility
var nua = navigator.userAgent;
var is_IE =
  nua.indexOf("Mozilla/5.0") > -1 &&
  nua.indexOf("Trident") > -1 &&
  !(nua.indexOf("Chrome") > -1);
if (is_IE) {
  console.log("Running in IE browser is not supported - ", nua);
}

// General Formatter Function
function _formatter(value, decimal, unit) {
  if (value === 0) {
    return "0 " + unit;
  } else {
    var si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
      { value: 1e21, symbol: "Z" },
      { value: 1e24, symbol: "Y" },
    ];
    for (var i = si.length - 1; i > 0; i--) {
      if (value >= si[i].value) {
        break;
      }
    }
    return (
      (value / si[i].value)
        .toFixed(decimal)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
      " " +
      si[i].symbol +
      unit
    );
  }
}

// Time Convert Local -> UTC
function convertLocalDateToUTCDate(date, toUTC) {
  date = new Date(date);
  var localOffset = date.getTimezoneOffset() * 60000;
  var localTime = date.getTime();
  if (toUTC) {
    date = localTime + localOffset;
  } else {
    date = localTime - localOffset;
  }
  newDate = new Date(date);
  return newDate;
}

// Time Convert UTC -> Local
function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  var localOffset = date.getTimezoneOffset() / 60;
  var hours = date.getUTCHours();
  newDate.setHours(hours - localOffset);
  return newDate;
}

// String Convert -> Date
function dateConvertor(date) {
  var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  var newDateFormat = new Date(date).toLocaleDateString("en-US", options);
  var newTimeFormat = new Date(date).toLocaleTimeString();
  var dateAndTime = newDateFormat + " " + newTimeFormat;
  return dateAndTime;
}

// String Convert -> Seconds
function readableSeconds(t) {
  var seconds = Math.round(t);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  if (days === Infinity) days = 0;
  hours = hours - days * 24;
  if (isNaN(hours)) hours = 0;
  if (hours === Infinity) hours = 0;
  minutes = minutes - days * 24 * 60 - hours * 60;
  if (isNaN(minutes)) minutes = 0;
  if (minutes === Infinity) minutes = 0;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
  if (isNaN(seconds)) seconds = 0;
  if (seconds === Infinity) seconds = 0;
  if (days > 0) {
    return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  }
  if (hours > 0) {
    return hours + "h " + minutes + "m " + seconds + "s";
  }
  if (minutes > 0) {
    return minutes + "m " + seconds + "s";
  }
  return seconds + "s";
}

// Time Different Calculation
function timeDiff(tstart, tend) {
  var diff = Math.floor((tend - tstart) / 1000),
    units = [
      { d: 60, l: "s" },
      { d: 60, l: "m" },
      { d: 24, l: "h" },
      { d: 7, l: "d" },
    ];
  var s = "";
  for (var i = 0; i < units.length; ++i) {
    s = (diff % units[i].d) + units[i].l + " " + s;
    diff = Math.floor(diff / units[i].d);
  }
  return s;
}

// Time Different Calculation To Seconds
function timeDiffSec(tstart, tend) {
  var diff = Math.floor((tend - tstart) / 1000),
    units = [{ d: 60, l: " seconds" }];
  var s = "";
  for (var i = 0; i < units.length; ++i) {
    s = (diff % units[i].d) + units[i].l + " " + s;
    diff = Math.floor(diff / units[i].d);
  }
  return s;
}

// Scroll To Top Of The Page
function scrollPageTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  var elmnt = document.getElementById("page-scroll-top");
  elmnt.scrollIntoView();
}

// Check If File Exits
function doesFileExist(urlToFile) {
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", urlToFile, false);
  xhr.send();
  if (xhr.status == "404") {
    return false;
  } else {
    return true;
  }
}

// Load Load General Data Page
function loadGeneralDataContent() {
  setInterval(
    (function load() {
      loadGeneralData();
      return load;
    })(),
    3000
  );
}

// Load General Data
function loadGeneralData() {
  return $.ajax(API + "pools")
    .done(function (data) {
      var coinLogo = "";
      var geckoLogo = "";
      var poolHeader = "";
      var poolHeader2 = "";
      var discordLink = "";
      var telegramLink = "";
      var twitterLink = "";
      var facebookLink = "";
      var coinWebLink = "";
      var coinGitLink = "";
      var footerLink = "";
      $.each(data.pools, function (index, value) {
        if (currentPool === value.id) {
          $("#nameOfCoin").text(value.coin.name);
          $("#nameOfCoinHeader").html(value.coin.name.toUpperCase());
          $("#nameOfCoinHeadline").html(value.coin.name.toUpperCase());
          $("#nameOfCoinHeadline2").html(value.coin.name.toUpperCase());
          $("#algoOfCoin").text(value.coin.algorithm);
          $("#algoOfCoinHeader").text(value.coin.algorithm.toLowerCase());
          $("#tickerOfCoin").text(coinTicker);
          $("#tickerOfCoingecko1").text(coinTicker);
          $("#tickerOfCoingecko2").text(coinTicker);
          $("#donationAddress").text(donation);
          $("#poolName").text(poolname);
          $("#logoOfCoin").text(coinLogoPath + currentPool + ".png");
          coinLogo +=
            "<img src='" +
            coinLogoPath +
            currentPool +
            ".png' class='user-img' alt='coinlogo'>";
          geckoLogo +=
            "<img src='" +
            coinLogoPath +
            currentPool +
            ".png' class='rounded-circle shadow' width='128' height='128' alt='coinlogobig'>";
          poolHeader +=
            "<a href='" +
            mainWeb +
            "' target='_blank'><h4 class='d-none d-lg-flex logo-text text-info'>POOL<span class='text-white'>2</span><span class='text-info'>MINE</span></h4></a>";
          poolHeader2 +=
            "<a href='" +
            mainWeb +
            "' target='_blank'><h4 class='d-none d-lg-flex logo-text text-info'>POOL<span class='text-white'>2</span><span class='text-info'>MINE</span></h4></a>";
          discordLink +=
            "<a class='nav-link dropdown-toggle dropdown-toggle-nocaret position-relative' href='" +
            discord +
            "' target='_blank'><i class='bx bxl-discord vertical-align-middle'></a></i>";
          telegramLink +=
            "<a class='nav-link dropdown-toggle dropdown-toggle-nocaret position-relative' href='" +
            telegram +
            "' target='_blank'><i class='bx bxl-telegram vertical-align-middle'></a>";
          twitterLink +=
            "<a class='nav-link dropdown-toggle dropdown-toggle-nocaret position-relative' href='" +
            twitter +
            "' target='_blank'><i class='bx bxl-twitter vertical-align-middle'></a>";
          facebookLink +=
            "<a class='nav-link dropdown-toggle dropdown-toggle-nocaret position-relative' href='" +
            facebook +
            "' target='_blank'><i class='bx bxl-facebook vertical-align-middle'></a>";
          coinWebLink +=
            "<a href='" +
            coinWeb +
            "' target='_blank'><i class='bx bx-world'></i> " +
            value.coin.name +
            " Website</a>";
          coinGitLink +=
            "<a href='" +
            coinGit +
            "' target='_blank'><i class='bx bxl-github'></i> " +
            value.coin.name +
            " Github</a>";
          footerLink +=
            "Copyright © 2021 <a href='" +
            mainWeb +
            "' target='_blank'>" +
            poolname +
            "</a>";
        }
        $("#coinLogo").html(coinLogo);
        $("#geckoLogo").html(geckoLogo);
        $("#poolHeader").html(poolHeader);
        $("#poolHeader2").html(poolHeader2);
        $("#discord").html(discordLink);
        $("#telegram").html(telegramLink);
        $("#twitter").html(twitterLink);
        $("#facebook").html(facebookLink);
        $("#coinWebLink").html(coinWebLink);
        $("#coinGitLink").html(coinGitLink);
        $("#footerLink").html(footerLink);
      });
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadGeneralData)" },
        { type: "danger", timer: 3000 }
      );
    });
}

// Load Home Page Content
function loadHomePage() {
  setInterval(
    (function load() {
      loadGeneralData();
      loadStatsTicker();
      loadStatsPrice();
      return load;
    })(),
    3000
  );
}

// Load Home Page Ticker Data
function loadStatsTicker() {
  return $.ajax(API + "pools")
    .done(function (data) {
      $.each(data.pools, function (index, value) {
        if (currentPool === value.id) {
          $("#blockchainHeightTicker").text(value.networkStats.blockHeight);
          $("#minimumPaymentTicker").text(
            value.paymentProcessing.minimumPayment + " " + value.coin.type
          );
          $("#payoutSchemeTicker").text(value.paymentProcessing.payoutScheme);
          $("#poolFeePercentTicker").text(value.poolFeePercent + " %");
          $("#poolHashrateTicker").text(
            _formatter(value.poolStats.poolHashrate, 5, "H/s")
          );
          $("#poolMinersTicker").text(
            value.poolStats.connectedMiners + " Miner(s)"
          );
          $("#poolWorkersTicker").text(
            value.poolStats.connectedWorkers + " Worker(s)"
          );
          $("#networkHashrateTicker").text(
            _formatter(value.networkStats.networkHashrate, 3, "H/s")
          );
          $("#networkDifficultyTicker").text(
            _formatter(value.networkStats.networkDifficulty, 3, "H/s")
          );
          $("#poolPaymentIntervalTicker").text(
            readableSeconds(value.paymentProcessing.extra.paymentInterval)
          );
        }
      });
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadStatsTicker)" },
        { type: "danger", timer: 3000 }
      );
    });
}

// Load Stats Page Content
function loadStatsPage() {
  setInterval(
    (function load() {
      loadGeneralData();
      loadStatsData();
      loadStatsChart();
      loadStatsPrice();
      return load;
    })(),
    3000
  );
}

// Load Stats Page Data
function loadStatsData() {
  return $.ajax(API + "pools")
    .done(function (data) {
      $.each(data.pools, function (index, value) {
        if (currentPool === value.id) {
          $.ajax(API + `pools/${value.id}`)
          .done(function (poolData) {
            let difficulties = poolData.difficulties.filter(p => p.poolId == value.id);
            if(difficulties.length != 0)
            {
              value.poolStats.sharesDiff = difficulties[0].difficulty;
            }
            var ttf = Math.round(
              (value.networkStats.networkHashrate /
                value.poolStats.poolHashrate) *
                value.blockTimeInterval
            );
            var effort = (
              (value.poolStats.sharesDiff /
                value.networkStats.networkDifficulty) *
              100
            ).toFixed(2);
            var lastPoolBlock = convertUTCDateToLocalDate(
              new Date(value.lastPoolBlockTime),
              false
            );
            var convertedBlockDate = dateConvertor(lastPoolBlock);
            $("#coinName").text(value.coin.name);
            $("#coinAlgo").text(value.coin.algorithm);
            $("#blockchainHeight").text(value.networkStats.blockHeight);
            $("#connectedPeers").text(value.networkStats.connectedPeers);
            $("#minimumPayment").text(
              value.paymentProcessing.minimumPayment + " " + value.coin.type
            );
            $("#payoutScheme").text(value.paymentProcessing.payoutScheme);
            $("#poolFeePercent").text(value.poolFeePercent + " %");
            $("#poolHashrate").text(
              _formatter(value.poolStats.poolHashrate, 5, "H/s")
            );
            $("#poolMiners").text(value.poolStats.connectedMiners + " Miner(s)");
            $("#poolWorkers").text(
              value.poolStats.connectedWorkers + " Worker(s)"
            );
            $("#networkHashrate").text(
              _formatter(value.networkStats.networkHashrate, 3, "H/s")
            );
            $("#netHashrate").text(
              _formatter(value.networkStats.networkHashrate, 3, "H/s")
            );
            $("#networkDifficulty").text(
              _formatter(value.networkStats.networkDifficulty, 3, "H/s")
            );
            $("#netDifficulty").text(
              _formatter(value.networkStats.networkDifficulty, 3, "H/s")
            );
            $("#poolTTF").text(readableSeconds(ttf));
            $("#poolEffort").text(effort + " %");
            $("#poolPaymentInterval").text(
              readableSeconds(value.paymentProcessing.extra.paymentInterval)
            );
            $("#currentShares").text(
              _formatter(value.poolStats.sharesDiff, 5, "")
            );
            $("#lastPoolBlock").text(convertedBlockDate);
          })
        }
      });
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadStatsData)" },
        { type: "danger", timer: 3000 }
      );
    });
}

// Load Stats Page Charts
function loadStatsChart() {
  return $.ajax(API + "pools/" + currentPool + "/performance")
    .done(function (data) {
      labels = [];
      poolHashrate = [];
      networkHashrate = [];
      networkDifficulty = [];
      connectedMiners = [];
      connectedWorkers = [];
      $.each(data.stats, function (index, value) {
        if (labels.length === 0 || (labels.length + 1) % 2 === 1) {
          var createDate = convertUTCDateToLocalDate(
            new Date(value.created),
            false
          );
          labels.push(createDate.getHours() + ":00");
        } else {
          labels.push("");
        }
        poolHashrate.push(value.poolHashrate);
        networkHashrate.push(value.networkHashrate);
        networkDifficulty.push(value.networkDifficulty);
        connectedMiners.push(value.connectedMiners);
        connectedWorkers.push(value.connectedWorkers);
      });
      var dataPoolHash = { labels: labels, series: [poolHashrate] };
      var dataNetworkHash = { labels: labels, series: [networkHashrate] };
      var dataNetworkDiff = { labels: labels, series: [networkDifficulty] };
      var dataMiners = { labels: labels, series: [connectedMiners] };
      var dataWorkers = { labels: labels, series: [connectedWorkers] };
      var options = {
        height: "377px",
        showArea: true,
        showPoint: false,
        seriesBarDistance: 1,
        axisX: { showGrid: false },
        fullWidth: true,
        chartPadding: { right: 10, left: -5, bottom: -10 },
        axisY: {
          offset: 47,
          scale: "logcc",
          labelInterpolationFnc: function (value) {
            return _formatter(value, 1, "H/s");
          },
        },
        lineSmooth: Chartist.Interpolation.simple({ divisor: 2 }),
      };
      var chartNethash = {
        height: "125px",
        showArea: true,
        showPoint: false,
        seriesBarDistance: 1,
        axisX: { showGrid: false },
        fullWidth: true,
        chartPadding: { right: 10, left: -5, bottom: -10 },
        axisY: {
          offset: 47,
          scale: "logcc",
          labelInterpolationFnc: function (value) {
            return _formatter(value, 1, "H/s");
          },
        },
        lineSmooth: Chartist.Interpolation.simple({ divisor: 2 }),
      };
      var chartNetdiff = {
        height: "125px",
        showArea: true,
        showPoint: false,
        seriesBarDistance: 1,
        axisX: { showGrid: false },
        fullWidth: true,
        chartPadding: { right: 10, left: -5, bottom: -10 },
        axisY: {
          offset: 47,
          scale: "logcc",
          labelInterpolationFnc: function (value) {
            return _formatter(value, 1, "H/s");
          },
        },
        lineSmooth: Chartist.Interpolation.simple({ divisor: 2 }),
      };
      var chartMiners = {
        height: "125px",
        showArea: true,
        showPoint: false,
        seriesBarDistance: 1,
        axisX: { showGrid: false },
        fullWidth: true,
        chartPadding: { right: 10, left: -5, bottom: -10 },
        axisY: {
          offset: 47,
          scale: "logcc",
          labelInterpolationFnc: function (value) {
            return _formatter(value, 1, "");
          },
        },
        lineSmooth: Chartist.Interpolation.simple({ divisor: 2 }),
      };
      var chartWorkers = {
        height: "125px",
        showArea: true,
        showPoint: false,
        seriesBarDistance: 1,
        axisX: { showGrid: false },
        fullWidth: true,
        chartPadding: { right: 10, left: -5, bottom: -10 },
        axisY: {
          offset: 47,
          scale: "logcc",
          labelInterpolationFnc: function (value) {
            return _formatter(value, 1, "");
          },
        },
        lineSmooth: Chartist.Interpolation.simple({ divisor: 2 }),
      };
      var responsiveOptions = [
        [
          "screen and (max-width: 640px)",
          {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[1];
              },
            },
          },
        ],
      ];
      Chartist.Line(
        "#chartStatsHashrate",
        dataNetworkHash,
        chartNethash,
        responsiveOptions
      );
      Chartist.Line(
        "#chartStatsHashratePool",
        dataPoolHash,
        options,
        responsiveOptions
      );
      Chartist.Line(
        "#chartStatsDiff",
        dataNetworkDiff,
        chartNetdiff,
        responsiveOptions
      );
      Chartist.Line(
        "#chartStatsMiners",
        dataMiners,
        chartMiners,
        responsiveOptions
      );
      Chartist.Line(
        "#chartStatsWorkers",
        dataWorkers,
        chartWorkers,
        responsiveOptions
      );
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadStatsChart)" },
        { type: "danger", timer: 3000 }
      );
    });
}

// Load Stats Price Data
function loadStatsPrice() {
  return $.ajax(geckoAPI + geckoCOIN)
    .done(function (data) {
      price = data.market_data.current_price.usd.toFixed(2);
      blockRewardUSD = (baseReward * price).toFixed(2);
      $("#coinToUSD").html(
        "$ " + data.market_data.current_price.usd.toFixed(2)
      );
      $("#coinToBTC").html(data.market_data.current_price.btc.toFixed(8));
      $("#priceHigh").html("$ " + data.market_data.high_24h.usd.toFixed(2));
      $("#priceHighBTC").html(data.market_data.high_24h.btc.toFixed(8));
      $("#priceLow").html("$ " + data.market_data.low_24h.usd.toFixed(2));
      $("#priceLowBTC").html(data.market_data.low_24h.btc.toFixed(8));
      $("#changeBTC").html(
        data.market_data.price_change_24h_in_currency.btc.toFixed(8)
      );
      $("#changeBTCPercent").html(
        data.market_data.price_change_percentage_24h_in_currency.btc.toFixed(
          2
        ) + " %"
      );
      $("#marketCap").html(data.market_data.market_cap_rank);
      $("#genesisDate").html(data.genesis_date);
      $("#blockToUSD").html(blockRewardUSD + " $");
      $("#lastBlockReward").html(baseReward + " " + coinTicker);
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadStatsPrice)" },
        { type: "danger", timer: 3000 }
      );
    });
}

// Load Dashboard Page Content
function loadDashboardPage() {
  function render() {
    setInterval(
      (function load() {
        loadDashboardData($("#walletAddress").val());
        loadDashboardWorkerList($("#walletAddress").val());
        loadDashboardAvgHash($("#walletAddress").val());
        loadDashboardChart($("#walletAddress").val());
        return load;
      })(),
      3000
    );
  }
  setInterval(
    (function load() {
      loadGeneralData();
      return load;
    })(),
    3000
  );
  var walletQueryString = window.location.hash.split(/[#/?]/)[3];
  if (walletQueryString) {
    var wallet = window.location.hash.split(/[#/?]/)[3].replace("address=", "");
    if (wallet) {
      $(walletAddress).val(wallet);
      localStorage.setItem(currentPool + "-walletAddress", wallet);
      render();
    }
  }
  if (localStorage[currentPool + "-walletAddress"]) {
    $("#walletAddress").val(localStorage[currentPool + "-walletAddress"]);
  }
}

// Load Dashboard Wallet
function loadWallet() {
  console.log("Loading wallet address:", $("#walletAddress").val());
  if ($("#walletAddress").val().length > 0) {
    localStorage.setItem(
      currentPool + "-walletAddress",
      $("#walletAddress").val()
    );
  }
  var coin = window.location.hash.split(/[#/?]/)[1];
  var currentPage = window.location.hash.split(/[#/?]/)[2] || "stats";
  window.location.href =
    "#" +
    currentPool +
    "/" +
    currentPage +
    "?address=" +
    $("#walletAddress").val();
}

// Load Dashboard Page Data
function loadDashboardData(walletAddress) {
  return (
    $.ajax(API + "pools").done(function (data) {
      $.each(data.pools, function (index, value) {
        if (currentPool === value.id) {
          poolhash = value.poolStats.poolHashrate;
          poolshares = value.poolStats.sharesDiff;
        }
      });
    }),
    $.ajax(API + "pools/" + currentPool + "/miners/" + walletAddress)
      .done(function (data) {
        var workerHashRate = 0;
        if (data.performance) {
          $.each(data.performance.workers, function (index, value) {
            workerHashRate += value.hashrate;
          });
        }
        var minershares = data.pendingShares;
        var shareDominance = ((minershares * 100) / poolshares).toFixed(2);
        var hashDominance = ((workerHashRate * 100) / poolhash).toFixed(2);
        var avgpay = ((shareDominance / 100) * baseReward).toFixed(4);
        $("#pendingShares").text(_formatter(data.pendingShares, 5, ""));
        $("#minerPercent").html(hashDominance + " %");
        $("#minerHashRate").text(_formatter(workerHashRate, 3, "H/s"));
        $("#pendingBalance").text(
          _formatter(data.pendingBalance, 8, " " + coinTicker)
        );
        $("#paidBalance").text(_formatter(data.todayPaid, 5, ""));
        $("#lifetimeBalance").text(
          _formatter(data.pendingBalance + data.totalPaid, 5, " " + coinTicker)
        );
        $("#minerSharesDominance").html(shareDominance + " %");
        $("#avgPayout").html(avgpay + " " + coinTicker);
      })
      .fail(function () {
        $.notify(
          { message: "Error: No response from API.<br>(loadDashboardData)" },
          { type: "danger", timer: 3000 }
        );
      })
  );
}

// Load Dashboard Page Worker
function loadDashboardWorkerList(walletAddress) {
  return $.ajax(API + "pools/" + currentPool + "/miners/" + walletAddress)
    .done(function (data) {
      var workerList = "";
      if (data.performance) {
        var workerCount = 0;
        $.each(data.performance.workers, function (index, value) {
          workerCount++;
          workerList += "<tr>";
          workerList +=
            "<td class='text-success'><b>" + workerCount + "</b></td>";
          if (index.length === 0) {
            workerList += "<td class='text-white'>Unnamed</td>";
          } else {
            workerList += "<td class='text-white'>" + index + "</td>";
          }
          workerList +=
            "<td class='text-white'>" +
            _formatter(value.hashrate, 3, "H/s") +
            "</td>";
          workerList +=
            "<td class='text-white'>" +
            _formatter(value.sharesPerSecond, 3, "S/s") +
            "</td>";
          workerList += "</tr>";
        });
      } else {
        workerList +=
          '<tr><td  class="text-danger" colspan="4">No Worker Connected</td></tr>';
      }
      $("#workerList").html(workerList);
    })
    .fail(function () {
      $.notify(
        {
          message: "Error: No response from API.<br>(loadDashboardWorkerList)",
        },
        { type: "danger", timer: 3000 }
      );
    });
}

// Load Average Hash Worker
function loadDashboardAvgHash(walletAddress) {
  return $.ajax(API + "pools/" + currentPool + "/miners/" + walletAddress)
    .done(function (data) {
      if (data.performanceSamples.length > 11) {
        var ht1 = 0;
        var ht2 = 0;
        var ht3 = 0;
        var ht4 = 0;
        var ht5 = 0;
        var ht6 = 0;
        var ht7 = 0;
        var ht8 = 0;
        var ht9 = 0;
        var ht10 = 0;
        var ht11 = 0;
        var ht12 = 0;
        $.each(data.performanceSamples[0].workers, function (index, value) {
          ht1 += value.hashrate;
        });
        $.each(data.performanceSamples[1].workers, function (index2, value2) {
          ht2 += value2.hashrate;
        });
        $.each(data.performanceSamples[2].workers, function (index3, value3) {
          ht3 += value3.hashrate;
        });
        $.each(data.performanceSamples[3].workers, function (index4, value4) {
          ht4 += value4.hashrate;
        });
        $.each(data.performanceSamples[4].workers, function (index5, value5) {
          ht5 += value5.hashrate;
        });
        $.each(data.performanceSamples[5].workers, function (index6, value6) {
          ht6 += value6.hashrate;
        });
        $.each(data.performanceSamples[6].workers, function (index7, value7) {
          ht7 += value7.hashrate;
        });
        $.each(data.performanceSamples[7].workers, function (index8, value8) {
          ht8 += value8.hashrate;
        });
        $.each(data.performanceSamples[8].workers, function (index9, value9) {
          ht9 += value9.hashrate;
        });
        $.each(data.performanceSamples[9].workers, function (index10, value10) {
          ht10 += value10.hashrate;
        });
        $.each(
          data.performanceSamples[10].workers,
          function (index11, value11) {
            ht11 += value11.hashrate;
          }
        );
        $.each(
          data.performanceSamples[11].workers,
          function (index12, value12) {
            ht12 += value12.hashrate;
          }
        );
        var avgtothash =
          (ht1 +
            ht2 +
            ht3 +
            ht4 +
            ht5 +
            ht6 +
            ht7 +
            ht8 +
            ht9 +
            ht10 +
            ht11 +
            ht12) /
          12;
        avghash = _formatter(avgtothash, 3, "H/s");
      } else {
        avghash = "Report After 12 Hours";
      }
      $("#avgHash").text(avghash);
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadDashboardAvgHash)" },
        { type: "danger", timer: 3000 }
      );
    });
}

// Load Dashboard Page Chart
function loadDashboardChart(walletAddress) {
  return $.ajax(
    API + "pools/" + currentPool + "/miners/" + walletAddress + "/performance"
  )
    .done(function (data) {
      labels = [];
      minerHashRate = [];
      $.each(data, function (index, value) {
        if (labels.length === 0 || (labels.length + 1) % 2 === 1) {
          var createDate = convertUTCDateToLocalDate(
            new Date(value.created),
            false
          );
          labels.push(createDate.getHours() + ":00");
        } else {
          labels.push("");
        }
        var workerHashRate = 0;
        $.each(value.workers, function (index2, value2) {
          workerHashRate += value2.hashrate;
        });
        minerHashRate.push(workerHashRate);
      });
      var data = { labels: labels, series: [minerHashRate] };
      var options = {
        height: "250px",
        showArea: true,
        showPoint: false,
        seriesBarDistance: 1,
        axisX: { showGrid: false },
        fullWidth: true,
        chartPadding: { right: 10, left: -5, bottom: -10 },
        axisY: {
          offset: 47,
          labelInterpolationFnc: function (value) {
            return _formatter(value, 1, "");
          },
        },
        lineSmooth: Chartist.Interpolation.simple({ divisor: 2 }),
      };
      var responsiveOptions = [
        [
          "screen and (max-width: 640px)",
          {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              },
            },
          },
        ],
      ];
      Chartist.Line(
        "#chartDashboardHashRate",
        data,
        options,
        responsiveOptions
      );
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadDashboardChart)" },
        { type: "danger", timer: 3000 }
      );
    });
}

// Load Miners page content
function loadTopMinersPage() {
  setInterval(
    (function load() {
      loadMinersPage();
      loadGeneralData();
      return load;
    })(),
    3000
  );
}

// Load Miners Page
function loadMinersPage() {
  return (
    $.ajax(API + "pools").done(function (data) {
      $.each(data.pools, function (index, value) {
        if (currentPool === value.id) {
          poolhash = value.poolStats.poolHashrate;
        }
      });
    }),
    $.ajax(API + "pools/" + currentPool + "/miners?page=0&pagesize=100")
      .done(function (data) {
        var minerList = "";
        if (data.length > 0) {
          var minerCount = 0;
          $.each(data, function (index, value) {
            minerCount++;
            minerhash = value.hashrate;
            minerDominance = ((minerhash * 100) / poolhash).toFixed(2);
            minerList += "<tr>";
            minerList +=
              "<td class='text-success'><b>" + minerCount + "</b></td>";
            minerList +=
              "<td class='text-white'><a href='dashboard.html?#" +
              currentPool +
              "/stats?address=" +
              value.miner +
              "'>" +
              value.miner +
              "</a></td>";
            minerList +=
              "<td class='text-white'>" +
              _formatter(value.sharesPerSecond, 5, "S/s") +
              "</td>";
            minerList +=
              "<td class='text-white'>" +
              _formatter(value.hashrate, 5, "H/s (Average Last Hour)") +
              "</td>";
            minerList += "<td class='text-white'>" + minerDominance + " %</td>";
            minerList += "</tr>";
          });
        } else {
          minerList += '<tr><td colspan="4">No Miner Connected</td></tr>';
        }
        $("#minerList").html(minerList);
      })
      .fail(function () {
        $.notify(
          { message: "Error: No response from API.<br>(loadMinersPage)" },
          { type: "danger", timer: 3000 }
        );
      })
  );
}

// Load Blocks Overview page content
function loadBlocksOverviewPage() {
  setInterval(
    (function load() {
      loadGeneralData();
      loadBlocksPage();
      loadAvgLuck16Page();
      loadAvgTotalPage();
      loadLastBlock();
      return load;
    })(),
    3000
  );
}

// Load Blocks page content
function loadBlocksPage() {
  return $.ajax(API + "pools/" + currentPool + "/blocks?page=0&pageSize=1000")
    .done(function (data) {
      var blockList = "";
      if (data.length > 0) {
        $.each(data, function (index, value) {
          var createDate = convertUTCDateToLocalDate(
            new Date(value.created),
            false
          );
          convertedDate = dateConvertor(createDate);
          var effort = (value.effort * 100).toFixed(2);
          var effortClass = "";
          if (effort < 100) {
            effortClass = "effort1";
          } else if (effort < 200) {
            effortClass = "effort2";
          } else if (effort < 500) {
            effortClass = "effort3";
          } else {
            effortClass = "effort4";
          }
          var calcs = Math.round(value.confirmationProgress * 100);
          blockList += "<tr>";
          blockList += "<td class='text-white'>" + convertedDate + "</td>";
          var blockart = value.type;
          if (value.type == "block") {
            blockList +=
              "<td><span class='badge badge-success'>Block</span></td>";
          } else if (value.type == "uncle") {
            blockList += "<td><span class='badge badge-info'>Uncle</span></td>";
          } else {
            blockList += "<td>" + blockart + "</td>";
          }
          blockList +=
            "<td class='text-white'><a href='dashboard.html?#" +
            currentPool +
            "/stats?address=" +
            value.miner +
            "'>" +
            value.miner.substring(0, 8) +
            " &hellip; " +
            value.miner.substring(value.miner.length - 8) +
            "</a></td>";
          blockList +=
            "<td><a href='" +
            value.infoLink +
            "' target='_blank'>" +
            value.blockHeight +
            "</a></td>";
          blockList +=
            "<td class='text-white'>" +
            _formatter(value.networkDifficulty, 5, "H/s") +
            "</td>";
          if (typeof value.effort !== "undefined") {
            blockList +=
              "<td><span class='" +
              effortClass +
              "'>" +
              effort +
              "%</span></td>";
          } else {
            blockList += "<td>n/a</td>";
          }
          var status = value.status;
          if (typeof value.status !== "confirmed") {
            blockList +=
              "<td><span class='badge badge-success'>Confirmed</span></td>";
          } else if (typeof value.status !== "pending") {
            blockList +=
              "<td><span class='badge badge-primary'>Pending</span></td>";
          } else if (typeof value.status !== "orphaned") {
            blockList +=
              "<td><span class='badge badge-danger'>Orphaned</span></td>";
          } else {
            blockList += "<td>" + status + "</td>";
          }
          blockList +=
            "<td class='text-white'>" +
            _formatter(value.reward, 5, "") +
            "</td>";
          blockList +=
            "<td><div class='progress-bar progress-bar-striped bg-info progress-bar-animated' role='progressbar' aria-valuenow='" +
            calcs +
            "' aria-valuemin='0' aria-valuemax='100' style='width: " +
            calcs +
            "%'><span class='text-white'>" +
            calcs +
            "% Completed</span></div></td>";
          blockList += "</tr>";
        });
      } else {
        blockList += '<tr><td colspan="6">No Blocks Found Yet</td></tr>';
      }
      $("#blockList").html(blockList);
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadBlocksPage)" },
        { type: "danger", timer: 3000 }
      );
    });
}

function loadAvgLuck16Page() {
  return $.ajax(API + "pools/" + currentPool + "/blocks?page=0&pageSize=16")
    .done(function (data) {
      var luckList16 = "";
      if (data.length > 0) {
        var total = 0;
        $.each(data, function (index, value) {
          total += value.effort;
        });
      }
      var avg16 = ((total * 100) / data.length).toFixed(2);
      var effortClass = "";
      if (avg16 < 100) {
        effortClass = "effort1";
      } else if (avg16 < 200) {
        effortClass = "effort2";
      } else if (avg16 < 500) {
        effortClass = "effort3";
      } else {
        effortClass = "effort4";
      }
      luckList16 = "<span class='" + effortClass + "'>" + avg16 + " %</span>";
      $("#avgLuck16").html(luckList16);
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadAvgLuck16Page)" },
        { type: "danger", timer: 3000 }
      );
    });
}

function loadAvgTotalPage() {
  return $.ajax(API + "pools/" + currentPool + "/blocks?page=0&pageSize=100000")
    .done(function (data) {
      var luckListAll = "";
      if (data.length > 0) {
        var total = 0;
        var totalCoin = 0;
        $.each(data, function (index, value) {
          total += value.effort;
          totalCoin += value.reward;
        });
      }
      var avg = ((total * 100) / data.length).toFixed(2);
      var effortClass = "";
      if (avg < 100) {
        effortClass = "effort1";
      } else if (avg < 200) {
        effortClass = "effort2";
      } else if (avg < 500) {
        effortClass = "effort3";
      } else {
        effortClass = "effort4";
      }
      luckListAll = "<span class='" + effortClass + "'>" + avg + " %</span>";
      var coins = totalCoin.toFixed(4);
      $("#avgLuckTotal").html(luckListAll);
      $("#totalBlocks").html(data.length + " Block(s)");
      $("#totalCoins").html(coins + " " + coinTicker);
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadAvgTotalPage)" },
        { type: "danger", timer: 3000 }
      );
    });
}

function loadLastBlock() {
  return $.ajax(API + "pools")
    .done(function (data) {
      $.each(data.pools, function (index, value) {
        if (currentPool === value.id) {
          var lastPoolBlocks = convertUTCDateToLocalDate(
            new Date(value.lastPoolBlockTime),
            false
          );
          $("#lastPoolBlocks").text(dateConvertor(lastPoolBlocks));
        }
      });
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadLastBlock)" },
        { type: "danger", timer: 3000 }
      );
    });
}

// Load Payments Page
function loadPaymentContent() {
  setInterval(
    (function load() {
      loadGeneralData();
      loadPaymentsPage();
      return load;
    })(),
    3000
  );
}

// Load Payments page content
function loadPaymentsPage() {
  return $.ajax(
    API + "pools/" + currentPool + "/payments?page=0&pageSize=1000000"
  )
    .done(function (data) {
      var paymentList = "";
      if (data.length > 0) {
        $.each(data, function (index, value) {
          var createDate = convertUTCDateToLocalDate(
            new Date(value.created),
            false
          );
          convertedDate = dateConvertor(createDate);
          paymentList += "<tr>";
          paymentList += "<td class='text-white'>" + convertedDate + "</td>";
          paymentList +=
            '<td><a href="' +
            value.addressInfoLink +
            '" target="_blank">' +
            value.address +
            "</td>";
          paymentList +=
            '<td class="text-success">' +
            _formatter(value.amount, 5, " ETH") +
            "</td>";
          paymentList +=
            '<td colspan="2"><a href="' +
            value.transactionInfoLink +
            '" target="_blank">' +
            value.transactionConfirmationData +
            "</a></td>";
          paymentList += "</tr>";
        });
      } else {
        paymentList += '<tr><td colspan="4">No Payments Made Yet</td></tr>';
      }
      $("#paymentList").html(paymentList);
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadPaymentsPage)" },
        { type: "danger", timer: 3000 }
      );
    });
}

// Load Connect page content
function loadConnectPage() {
  return $.ajax(API + "pools")
    .done(function (data) {
      var connectPoolConfig = "";
      $.each(data.pools, function (index, value) {
        if (currentPool === value.id) {
          defaultPort = Object.keys(value.ports)[0];
          coinName = value.coin.name;
          coinType = value.coin.type.toLowerCase();
          algorithm = value.coin.algorithm;
          connectPoolConfig +=
            "<tr><td class='text-primary'>Crypto Coin Name</td><td class='text-white'>" +
            coinName +
            " (" +
            value.coin.type +
            ") </td></tr>";
          connectPoolConfig +=
            "<tr><td class='text-primary'>Coin Algorithm</td><td class='text-white'>" +
            value.coin.algorithm +
            "</td></tr>";
          connectPoolConfig +=
            "<tr><td class='text-primary'>Coin Reward Type</td><td class='text-white'>" +
            value.networkStats.rewardType +
            "</td></tr>";
          connectPoolConfig +=
            '<tr><td class="text-primary">Pool Wallet</td><td><a href="' +
            value.addressInfoLink +
            '" target="_blank">' +
            value.address.substring(0, 12) +
            " &hellip; " +
            value.address.substring(value.address.length - 12) +
            "</a></td></tr>";
          connectPoolConfig +=
            "<tr><td class='text-primary'>Payout Scheme</td><td class='text-white'>" +
            value.paymentProcessing.payoutScheme +
            "</td></tr>";
          connectPoolConfig +=
            "<tr><td class='text-primary'>Minimum Payment</td><td class='text-white'>" +
            value.paymentProcessing.minimumPayment +
            " " +
            value.coin.type +
            "</td></tr>";
          connectPoolConfig +=
            "<tr><td class='text-primary'>Pool Fee</td><td class='text-white'>" +
            value.poolFeePercent +
            "%</td></tr>";
        }
        $("#connectPoolConfig").html(connectPoolConfig);
      });
    })
    .fail(function () {
      $.notify(
        { message: "Error: No response from API.<br>(loadConnectPage)" },
        { type: "danger", timer: 3000 }
      );
    });
}
