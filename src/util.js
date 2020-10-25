/*
* @author: Daniel Johnson
* @file: util.js
* @brief: This file provides two utility functions for converting number <=> char
*/

numToChar = function(num){
    return String.fromCharCode(97 + num); //Ex: 0 => "a", 1 => "b", etc.
}
charToNum = function(char){
    return char.charCodeAt(0) - 97; //Ex: "a" => 0, "b" => 1, etc.
}