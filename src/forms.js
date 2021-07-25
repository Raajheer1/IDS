/*
   ZDV IDS - Information Display System
   Copyright (C) 2021  Raaj T. Patel <raaj.patel229@gmail.com>

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as published
   by the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const IDSForm = document.getElementById("IDSForm");
IDSForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const hs = document.querySelector("#HS").value / 100 + 1;
  const he = document.querySelector("#HE").value / 100 + 1;
  const AAR = parseInt(document.querySelector("#AAR").value);
  const DAAR = parseInt(document.querySelector("#DAAR").value);
  var AADC = [];
  AADC.push(hs);
  AADC.push(he);
  AADC.push(AAR);
  AADC.push(DAAR);

  ipcRenderer.send("AADC:add", AADC);
});