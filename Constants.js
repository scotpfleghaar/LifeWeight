export const HANSIS_DARK = '#346e97'; // (52,110,151)
export const HANSIS_MEDIUM_DARK = '#4979ab'; // (73,121,171)
export const HANSIS_MEDIUM = '#8facca'; // (143,172,202)
export const HANSIS_MEDIUM_LIGHT = '#e6f0f6'; // (230,240,246)
export const HANSIS_LIGHT = '#f9f9f9';
export const PURE_WHITE = '#ffffff';


export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const WEIGHT_POSTFIX = 'lbs';



export const EMAIL_CHANGED = "EMAIL_CHANGED";
export const PASSWORD_CHANGED = "PASSWORD_CHANGED";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const LOGIN_USER_INITIALIZED = "LOGIN_USER_INITIALIZED";


export const ADD_WEIGHT_RECORD = 'ADD_WEIGHT_RECORD';
export const FETCH_WEIGHT_RECORDS = 'FETCH_WEIGHT_RECORDS';
export const EDIT_WEIGHT_RECORD = 'EDIT_WEIGHT_RECORD';
export const DELETE_WEIGHT_RECORD = 'DELETE_WEIGHT_RECORD';
export const DELETE_ALL_RECORDS_PERMINANT = 'DELETE_ALL_RECORDS_PERMINANT';
export const UPDATE_GOAL_WEIGHT = 'UPDATE_GOAL_WEIGHT';
export const PREMIUM_USER = 'PREMIUM_USER';


export const TOOLTIP_WEIGHT_RECORD_DESCRIPTION = 'How well did you follow your diet since you last checked in? Green: Nailed it!, Blue: Moderately, Red: did not follow. This helps determine helpful and motivational information for you. This information gets generated into graphs that give you insight into what happens when you follow your diet!';
export const MOVING_AVERAGE_LINE_GRAPH_DESCRIPTION = 'The Moving average is a close representation of your actual weight. It attempts to even out the ups and downs of each checkin and give you an average trajectory of weight change over the previous 14 check ins. The color of each dot shows your report on how well you followed your diet when you checked In.';
export const ACTUAL_DATA_LINE_GRAPH_DESCRIPTION = 'This line graph shows the actual value from the most recent 14 check ins. The color of each dot shows your report on how well you followed your diet when you checked In.';
export const WEIGHT_GAIN_LOSS_BAR_GRAPH_DESCRIPTION = "This shows the percent of check ins you reported on how well you followed your diet over the past 14 check ins. It gives an estimated weight loss when you do, sorta, or don't follow your diet.";
export const HOW_OFTEN_YOUR_DIET_IS_FOLLOWED_DESCRIPTION = 'This shows how often you followed your diet over the passed 14 Check Ins.';
export const NO_WEIGHT_TIMELINE = `Based on your recent records, there isn't enough progress to get these estimations. Keep checking in and come back soon!`;


const description = `LifeWeight doesn’t care about calorie tracking or what specific diet your following, it cares about what happens when you follow your diet. Dieting and exercising are incredibly hard, and sometimes we mess up and don’t know how that affects our weight. LifeWeight aims to show you what happens when you follow your diet and what happens when you don’t. By understanding these dynamics, you can have real insights into your weight that help you stay motivated!

LifeWeight is simple and asks for only your weight and how well you followed your diet since your last check-in. From this information, you can see the changes and effects your diet has on your weight. A robust and powerful algorithm generates averages, trends, and other interesting data in easy to read graphs and charts to help keep you positive and give you the information you need to succeed with your diet.

Features:
- Weight Goal with an estimation timeline
- Weight tracking system
- Detailed information about what happens when you follow your diet
- Simple interface that is not cluttered
- Download data to CSV
`