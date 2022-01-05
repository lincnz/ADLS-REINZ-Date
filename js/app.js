//might get rid of
let date = Date();
let currentDate = new Date(date);
let startDateFinal = new Date();
let endDateFinal = new Date(); 

let adlsDate = {
  adlsDateFunc : function(date){  
    let currentDate = new Date(date);
    let district = $("#districts :selected").val();
    let day = currentDate.getDay(); //stored as number 0 to 6, 0 being sunday
    let dayOfMonth = currentDate.getDate(); // day of month 1-31 as number
    let month = currentDate.getMonth(); //stored as number 0-11, 0 being january
    let year = currentDate.getFullYear() //4-digit number

    function lim_date() {
      if (
          document.getElementById("lim_date").checked &&
          (
            ((dayOfMonth >= 24) && (month === 11)) || //december
            ((dayOfMonth <= 15) && (month === 0)) //january
          )
      ) {
        return true
      }
      else {
        return false
      }
    }
    
    //returns "true" for saturday and sunday
    function weekend() {
      return (
        day === 0 || //sunday
        day === 6  //saturday
      )
    }

    //returns "true" if the date is waitangi day OR a mondayised day off due to waitangi day falling on the weekend (6/7/8 feb)
    function waitangi () {
      if (
        dayOfMonth === 6 &&  //6th
        month === 1 &&  //february
        !(weekend(day)) //notweekend
      ) {
        return true
      }
      else if ( //if the 7th feb is a monday, waitangi day fell on the prior sunday
        dayOfMonth === 7 && //7th
        month === 1 && //feb
        day === 1 //monday
      ) {
        return true
      }
      else if ( //if the 8th feb is a monday, waitangi day fell on the prior saturday
          dayOfMonth === 8 && //8th
          month === 1 && //feb
          day === 1 //mon
      ) {
        return true
      }
      else {
        return false 
      }
    }

    //returns "true" if the date is anzac day OR a mondayised day off due to anzac day falling on the weekend (25/26/27 apr), note that the law does not allow for tuesdayisation if there is a clash with easter monday, next occurence 2095
    function anzac () {
      if (
        dayOfMonth === 25 && //25th
        month === 3 && //april
        !(weekend(day)) //notweekend
      ) {
        return true
      }
      else if ( //if the 26th apr is a monday, anzac day fell on the prior sunday
        dayOfMonth === 26 && //26th
        month === 3 && //april
        day === 1 //monday
      ) {
        return true
      }
      else if ( //if the 27th apr is a monday, anzac day fell on the prior saturday
          dayOfMonth === 27 && //27th
          month === 3 && //feb
          day === 1 //mon
      ) {
        return true
      }
      else {
        return false
      }
    }

    //the easter computus for calculating easter sunday
    function computus(Y) {
      //credit to Martin Webb: https://www.irt.org/utility/smprint.htm
      var C = Math.floor(Y/100);
      var N = Y - 19*Math.floor(Y/19);
      var K = Math.floor((C - 17)/25);
      var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
      I = I - 30*Math.floor((I/30));
      I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
      var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
      J = J - 7*Math.floor(J/7);
      var L = I - J;
      var M = 3 + Math.floor((L + 40)/44);
      var D = L + 28 - 31*Math.floor(M/4);
      
      return [D, (M-1)];
    }
    
    //returns "true" if the date is good friday (20 march  - 23 apr)
    function goodfriday () {
      var easterSun = computus(year); //array where 0: date, 1: month of easter
      
      //a lighter, alternative solution to complete. Not used
      var gfDate = function() {
        return [d, m]; //pass to if statement
      };

      if ( //if easter sunday falls on 1 april and good friday is in march
        easterSun[0] === 1 &&
        dayOfMonth === 30 &&
        month === easterSun[1] - 1 &&
        day === 5 
      ) {
        return true;
      }
      else if ( //if easter sunday falls on 2 april and good friday is in march
        easterSun[0] === 2 &&
        dayOfMonth === 31 &&
        month === easterSun[1] - 1 &&
        day === 5 
      ) {
        return true;
      }
      else if ( //if easter sunday falls on any other day
          dayOfMonth === (easterSun[0] - 2) &&
          month === easterSun[1]
      ) {
        return true;
      }
      else {
        return false;
      }
    }

    //returns "true" if the date is easter monday (23 march - 26 apr)
    function eastermonday () {
      var easterSun = computus(year); //array where 0: date, 1: month of easter
      
      if ( //if easter sunday falls on 31 march and easter monday is in april
        easterSun[0] === 31 &&
        dayOfMonth === 1 &&
        month === easterSun[1] + 1 &&
        day === 1 
      ) {
        return true;
      }
      else if ( //if easter sunday falls on any other day
          dayOfMonth === (easterSun[0] + 1) &&
          month === easterSun[1]
      ) {
        return true;
      }
      else {
        return false;
      }
    }

    //returns true if the date is matariki from 2022. (20 june - 29 july) (always friday)
    function matariki () {
      var matarikiDates = [ //series of arrays of future matariki dates in format dayOfMonth/month/year. To be replaced with a matariki formula if one becomes available
        [24, 5, 2022], //2022
        [14, 6, 2023],
        [28, 5, 2024],
        [20, 5, 2025], //earliest
        [10, 6, 2026],
        [25, 5, 2027],
        [14, 6, 2028],
        [6, 6, 2029],
        [21, 5, 2030],
        [11, 6, 2031],
        [2, 6, 2032],
        [24, 5, 2033],
        [7, 6, 2034],
        [29, 5, 2035],
        [18, 6, 2036],
        [10, 6, 2037],
        [25, 5, 2038],
        [15, 6, 2039],
        [6, 6, 2040],
        [19, 6, 2041],
        [11, 6, 2042],
        [3, 6, 2043],
        [24, 5, 2044],
        [7, 6, 2045],
        [29, 5, 2046],
        [29, 6, 2047], //latest
        [3, 6, 2048],
        [25, 5, 2049],
        [15, 6, 2050],
        [30, 5, 2051]
        [21, 5, 2052] //2052
      ]

      return (
        year >= 2022 && //always a friday, cannot clash with sovereign's birthday
        day === 5 &&
        year === matarikiDates[(year - 2022)][2] &&
        month === matarikiDates[(year - 2022)][1] &&
        dayOfMonth === matarikiDates[(year - 2022)][0]
      )
    }

    //returns true if the date is the sovereign's official birthday (1 june - 7 june) (always monday)
    function sovbday () {
      return (
        day === 1 &&
        month === 5 &&
        dayOfMonth <= 7 //if 1st june is a tuesday, the latest possible first monday in june is monday 7th
      )
    }

    //returns true if the date is labour day (nz) (22 oct - 28 oct)
    function labourday () {
      return (
        day === 1 && //monday
        month === 9 && //october
        dayOfMonth >= 22 && //earliest possible 4th monday in october
        dayOfMonth <= 28 //latest possible 4th monday in october
      )
    }

    //regional days
    function auckland_ann () {//monday closest to 29 jan (26 jan - 1 feb)
      return ((
          month === 0 && //the monday that falls between jan 26 and 31
          dayOfMonth >= 26 &&
          dayOfMonth <= 31 &&
          day === 1
        ) || ( //or
          month === 1 && //or if monday falls on 1 feb
          dayOfMonth === 1 &&
          day === 1
      ))
    }

    function southcanterbury_ann () {//fourth monday in sept (22 sept - 28 sept)
      return (
        day === 1 && //monday
        month === 8 && //september
        dayOfMonth >= 22 && //earliest possible 4th monday in september
        dayOfMonth <= 28 //latest possible 4th monday in september
      )
    }

    function canterbury_ann () {// second friday following first tuesday in november (11 nov - 17 nov) - note: north canterbury and central canterbury celebrate on christchurch show day, *swearing*.
      return (
          day === 5 && //friday
          month === 10 && //november
          dayOfMonth >= 11 && //date range
          dayOfMonth <= 17
      )
    }

    function chatham_ann () {//monday nearest to 30 november (27 nov - 3 dec)
      return ((
          month === 10 && //november
          dayOfMonth >= 27 &&
          dayOfMonth <= 30 &&
          day === 1
        ) || ( //or
          month === 11 && //or if monday falls on 1, 2, 3 dec
          dayOfMonth <= 3 &&
          day === 1
      ))
    }

    function hawkes_bay_ann () {//the friday before labour day (19 oct -  25 oct)
      return (
        day === 5 && //friday
        month === 9 && //october
        dayOfMonth >= 19 && //earliest possible date
        dayOfMonth <= 25 //latest possible date
      )
    } 

    function marlborough_ann () {//first monday after labour day (29 oct - 4 nov)
      return ((
        day === 1 && //monday
        month === 9 && //october
        dayOfMonth >= 29 && //earliest possible date
        dayOfMonth <= 31 //latest possible date in oct
      ) || ( //or
        month === 10 && //or if falls in november
        dayOfMonth <= 4 &&
        day === 1
      ))
    }

    function nelson_ann () {//monday nearest to feb 1st (29 jan - 4 feb)
      return ((
          month === 1 && //in feb
          dayOfMonth <= 4 &&
          day === 1
        ) || ( //or
          month === 0 && //or if the monday falls in jan
          dayOfMonth >= 29 &&
          day === 1
      ))
    }

    function otago_ann () {//monday closest to march 23, moved to tuesday if easter monday (20 march - 27 march)
      if (
          month === 2 && 
          dayOfMonth >= 20 &&
          dayOfMonth <= 26 &&
          day === 1 &&
          computus(year)[0] != dayOfMonth - 1 
      ) { 
        return true 
      }
      else if (
          computus(year)[0] === (dayOfMonth - 2) &&
          computus(year)[1] === 2 &&
          month === 2 &&
          dayOfMonth >= 21 &&
          dayOfMonth <= 27 &&
          day === 2
      ) { 
        return true 
      }
      else {
        return false
      }
    }

    function southland_ann () {//easter tuesday *ANZAC CLASH UNRESOLVED - no explicit tuesdayisation law, next clash 2079* (wide range - 22 mar- 25 apr) 
      return ((
        computus(year)[0] === (dayOfMonth - 2) && //2 days after easter sunday
        day === 2
      ) || (
        computus(year)[0] <= 31 && //if easter sunday is in march and easter tuesday is in april
        computus(year)[0] >= 30 &&
        month === 3 &&
        dayOfMonth <= 2 &&
        dayOfMonth >= 1 &&
        day === 2
      ))
    }

    function taranaki_ann () {// second monday of march (8 mar - 14 mar)
      return (
          month === 2 && //march
          dayOfMonth >= 8 &&
          dayOfMonth <= 14 &&
          day === 1
      )
    }

    function wellington_ann () {//monday nearest 22 jan (19 jan - 25 jan)
      return (
          month === 0 && //january
          dayOfMonth >= 19 &&
          dayOfMonth <= 25 &&
          day === 1
      )
    }

    function westland_ann () {//monday nearest 1 december (28 nov - 4 dec)
      return ((
          month === 11 && //december
          dayOfMonth <= 4 &&
          day === 1
        ) || ( //or
          month === 10 && //or if monday falls on 28, 29, 30 nov
          dayOfMonth >= 28 &&
          day === 1
      ))
    }

    //takes region input, and returns true if the date is a regional holiday

    function regionaldays_min (d) {
      return (
        d === 'auckland' && auckland_ann() ||
        d === 'canterbury_south' && southcanterbury_ann() ||
        d === 'canterbury'  && canterbury_ann() ||
        d === 'chatham' && chatham_ann() ||
        d === 'hawkes_bay' && hawkes_bay_ann() ||
        d === 'marlborough' && marlborough_ann() ||
        d === 'nelson' && nelson_ann() ||
        d === 'otago' && otago_ann() ||
        d === 'southland' && southland_ann() ||
        d === 'taranaki' && taranaki_ann() ||
        d === 'wellington' && wellington_ann() ||
        d === 'westland' && westland_ann()
      )
    }

    //returns true if the date is in the period from 24 dec to 5 jan inclusive
    function xmas () {
      return (
        ((dayOfMonth >= 24) && (month === 11)) || //december
        ((dayOfMonth <= 5) && (month === 0)) //january
      ) 
    }
    
    //main function that runs each test in turn
    function isADLSWorkingDay () {   
      if (weekend() ){console.log("weekend" + dayOfMonth)}
      if (waitangi() ){console.log("waitangi" + dayOfMonth)}
      if (anzac() ){console.log("anzac" + dayOfMonth)}
      if (matariki() ){console.log("matariki" + dayOfMonth)}
      if (xmas() ){console.log("xmas" + dayOfMonth)}
      if (goodfriday() ){console.log("good friday" + dayOfMonth)}
      if (eastermonday() ){console.log("easter monday" + dayOfMonth)}
      if (sovbday() ){console.log("sovbday" + dayOfMonth)}
      if (labourday() ){console.log("labourday" + dayOfMonth)}
      if (regionaldays_min(district)) {console.log("regional day " + district +" "+ dayOfMonth)}
      return (
          !lim_date() &&
          !weekend() &&
          !waitangi() &&
          !anzac() &&
          !matariki() &&
          !xmas() &&
          !goodfriday() &&
          !eastermonday() &&
          !sovbday() &&
          !labourday() &&
          !regionaldays_min(district)
      )
    }

    //calls main function that runs through each public holiday
    return isADLSWorkingDay();
  },

  adlsDateRangeFunc : function() {
    let testDate = new Date(); //the day iteratively being tested as a working day
    let workingDays = 0; //the product

    //derives the number days forward to test
    let testDays = (endDateFinal - startDateFinal)/864e5;
    if ($("#districts :selected").val() != "")
      for (let i = 1; i <= testDays; i++ ) 
      {
        testDate.setTime(startDateFinal.getTime() + i*864e5);
        if (this.adlsDateFunc(testDate)){
          workingDays++;
        }
        //the output
        $(".output_range").text(workingDays + " working days");
      }
    else {
      $(".output_range").text("Select district");
    }
  }
}

$( document ).ready(function() {
    $(".output").text("");

    //datepicker code has to run after document is ready
    const start = datepicker(
      '.start', 
      { 
        id: 1,
        onSelect: (instance, date) => {
          startDateFinal = date;
        } 
      }
    )

    const end = datepicker(
      '.end', 
      { 
        id: 1,
        onSelect: (instance, date) => {
          endDateFinal = date;
        }
      }
    )
});