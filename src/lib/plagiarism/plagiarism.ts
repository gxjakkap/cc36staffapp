import jsonData from "./Plagiarism_Checked_90_new.json"; //gen มาจาก collab ที่จิตอลทำ

export interface Plagiarism {
  id: string;
  userId: string;
  algo_part_1: string;
  algo_part_2: string;
  algo_part_3: string;
  high_sim_algo_part_1: number[];
  high_sim_algo_part_2: number[];
  high_sim_algo_part_3: number[];
  high_sim_algo_part_1_userId: string[];
  high_sim_algo_part_2_userId: string[];
  high_sim_algo_part_3_userId: string[];
}

export const plagiarismData = jsonData as Plagiarism[];
