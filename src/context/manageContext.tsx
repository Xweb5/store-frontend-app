import {atomWithStorage} from "jotai/utils"

export const chartCounter = atomWithStorage("addChartCounter", 0);
export const usersPassword = atomWithStorage("userPassword", { username : "", password : ""});