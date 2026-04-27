import csv
import json

raw_data = """No,Sport Name,Category,Format,Date,Start,End,Event Name,Event Code,Athlete/Team A,Result,Athlete/Team B,Event Type,Competition Format,Note
1,Chess,Caro,C nhn,5/20/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng A - L??t 1 - Tr?n 1,Tuan Nguyen,1 - 0,Dinh Ngu?en,Normal Match,Offline at Havana,
2,Chess,Caro,C nhn,5/20/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng B - L??t 1 - Tr?n 1,,,,Normal Match,Offline at Havana,
3,Chess,Caro,C nhn,5/20/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng A - L??t 1 - Tr?n 2,,,,Normal Match,Offline at Havana,
4,Chess,Caro,C nhn,5/20/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng B - L??t 1 - Tr?n 2,,,,Normal Match,Offline at Havana,
5,Chess,Caro,C nhn,5/21/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng C - L??t 1 - Tr?n 1,,,,Normal Match,Offline at Havana,
6,Chess,Caro,C nhn,5/21/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng D - L??t 1 - Tr?n 1,,,,Normal Match,Offline at Havana,
7,Chess,Caro,C nhn,5/21/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng C - L??t 1 - Tr?n 2,,,,Normal Match,Offline at Havana,
8,Chess,Caro,C nhn,5/21/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng D - L??t 1 - Tr?n 2,,,,Normal Match,Offline at Havana,
9,Chess,Caro,C nhn,5/27/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng A - L??t 2 - Tr?n 1,,,,Normal Match,Offline at Havana,
10,Chess,Caro,C nhn,5/27/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng B - L??t 2 - Tr?n 1,,,,Normal Match,Offline at Havana,
11,Chess,Caro,C nhn,5/27/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng A - L??t 2 - Tr?n 2,,,,Normal Match,Offline at Havana,
12,Chess,Caro,C nhn,5/27/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng B - L??t 2 - Tr?n 2,,,,Normal Match,Offline at Havana,
13,Chess,Caro,C nhn,5/28/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng C - L??t 2 - Tr?n 1,,,,Normal Match,Offline at Havana,
14,Chess,Caro,C nhn,5/28/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng D - L??t 2 - Tr?n 1,,,,Normal Match,Offline at Havana,
15,Chess,Caro,C nhn,5/28/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng C - L??t 2 - Tr?n 2,,,,Normal Match,Offline at Havana,
16,Chess,Caro,C nhn,5/28/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng D - L??t 2 - Tr?n 2,,,,Normal Match,Offline at Havana,
17,Chess,Caro,C nhn,6/3/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng A - L??t 3 - Tr?n 1,,,,Normal Match,Offline at Havana,
18,Chess,Caro,C nhn,6/3/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng B - L??t 3 - Tr?n 1,,,,Normal Match,Offline at Havana,
19,Chess,Caro,C nhn,6/3/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng A - L??t 3 - Tr?n 2,,,,Normal Match,Offline at Havana,
20,Chess,Caro,C nhn,6/3/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng B - L??t 3 - Tr?n 2,,,,Normal Match,Offline at Havana,
21,Chess,Caro,C nhn,6/4/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng C - L??t 3 - Tr?n 1,,,,Normal Match,Offline at Havana,
22,Chess,Caro,C nhn,6/4/2026,18:00,18:30,Caro - Vng B?ng,Caro - B?ng D - L??t 3 - Tr?n 1,,,,Normal Match,Offline at Havana,
23,Chess,Caro,C nhn,6/4/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng C - L??t 3 - Tr?n 2,,,,Normal Match,Offline at Havana,
24,Chess,Caro,C nhn,6/4/2026,18:30,19:00,Caro - Vng B?ng,Caro - B?ng D - L??t 3 - Tr?n 2,,,,Normal Match,Offline at Havana,
25,Chess,Caro,C nhn,6/10/2026,18:00,18:30,Caro - Vng Lo?i Tr?c Ti?p,Caro - Vng T? k?t - T? k?t 1,,,,Normal Match,Offline at Havana,
26,Chess,Caro,C nhn,6/10/2026,18:00,18:30,Caro - Vng Lo?i Tr?c Ti?p,Caro - Vng T? k?t - T? k?t 2,,,,Normal Match,Offline at Havana,
27,Chess,Caro,C nhn,6/10/2026,18:30,19:00,Caro - Vng Lo?i Tr?c Ti?p,Caro - Vng T? k?t - T? k?t 3,,,,Normal Match,Offline at Havana,
28,Chess,Caro,C nhn,6/10/2026,18:30,19:00,Caro - Vng Lo?i Tr?c Ti?p,Caro - Vng T? k?t - T? k?t 4,,,,Normal Match,Offline at Havana,
29,Chess,Caro,C nhn,6/11/2026,18:00,18:30,Caro - Vng Lo?i Tr?c Ti?p,Caro - Vng Bn k?t - Bn k?t 1,,,,"Key Match
Livestream",Offline at Havana,
30,Chess,Caro,C nhn,6/11/2026,18:00,18:30,Caro - Vng Lo?i Tr?c Ti?p,Caro - Vng Bn k?t - Bn k?t 2,,,,"Key Match
Livestream",Offline at Havana,
31,Chess,Caro,C nhn,6/11/2026,18:30,19:00,Caro - Vng Chung K?t,Caro - Tr?n Chung k?t,,,,"Final Match
Livestream",Offline at Havana,
32,Chess,Domino,C nhn,5/22/2026,18:00,18:30,Domino - Vng B?ng,Domino - B?ng A - L??t 1 - Tr?n 1,,,,Normal Match,Offline at Havana,
33,Chess,Domino,C nhn,5/22/2026,18:00,18:30,Domino - Vng B?ng,Domino - B?ng B - L??t 1 - Tr?n 1,,,,Normal Match,Offline at Havana,
34,Chess,Domino,C nhn,5/22/2026,18:30,19:00,Domino - Vng B?ng,Domino - B?ng A - L??t 1 - Tr?n 2,,,,Normal Match,Offline at Havana,
35,Chess,Domino,C nhn,5/22/2026,18:30,19:00,Domino - Vng B?ng,Domino - B?ng B - L??t 1 - Tr?n 2,,,,Normal Match,Offline at Havana,
36,Chess,Domino,C nhn,5/29/2026,18:00,18:30,Domino - Vng B?ng,Domino - B?ng A - L??t 2 - Tr?n 1,,,,Normal Match,Offline at Havana,
37,Chess,Domino,C nhn,5/29/2026,18:00,18:30,Domino - Vng B?ng,Domino - B?ng B - L??t 2 - Tr?n 1,,,,Normal Match,Offline at Havana,
38,Chess,Domino,C nhn,5/29/2026,18:30,19:00,Domino - Vng B?ng,Domino - B?ng A - L??t 2 - Tr?n 2,,,,Normal Match,Offline at Havana,
39,Chess,Domino,C nhn,5/29/2026,18:30,19:00,Domino - Vng B?ng,Domino - B?ng B - L??t 2 - Tr?n 2,,,,Normal Match,Offline at Havana,
40,Chess,Domino,C nhn,6/5/2026,18:00,18:30,Domino - Vng B?ng,Domino - B?ng A - L??t 3 - Tr?n 1,,,,Normal Match,Offline at Havana,
41,Chess,Domino,C nhn,6/5/2026,18:00,18:30,Domino - Vng B?ng,Domino - B?ng B - L??t 3 - Tr?n 1,,,,Normal Match,Offline at Havana,
42,Chess,Domino,C nhn,6/5/2026,18:30,19:00,Domino - Vng B?ng,Domino - B?ng A - L??t 3 - Tr?n 2,,,,Normal Match,Offline at Havana,
43,Chess,Domino,C nhn,6/5/2026,18:30,19:00,Domino - Vng B?ng,Domino - B?ng B - L??t 3 - Tr?n 2,,,,Normal Match,Offline at Havana,
44,Chess,Domino,C nhn,6/12/2026,18:00,18:30,Domino - Vng Lo?i Tr?c Ti?p,Domino - Vng Bn k?t - Bn k?t 1,,,,"Key Match
Livestream",Offline at Havana,
45,Chess,Domino,C nhn,6/12/2026,18:00,18:30,Domino - Vng Lo?i Tr?c Ti?p,Domino - Vng Bn k?t - Bn k?t 2,,,,"Key Match
Livestream",Offline at Havana,
46,Chess,Domino,C nhn,6/12/2026,18:30,19:00,Domino - Vng Chung K?t,Domino - Tr?n Chung k?t,,,,"Final Match
Livestream",Offline at Havana,
47,Esports,Audition,C nhn,5/19/2026,18:30,19:00,Audition - Vng B?ng,Audition - Nh?y ??n Crazy4 - L??t 1 - B?ng A,,,,"Normal Match
Livestream",Online,
48,Esports,Audition,C nhn,5/19/2026,19:00,19:30,Audition - Vng B?ng,Audition - Nh?y ??n Crazy4 - L??t 1 - B?ng B,,,,"Normal Match
Livestream",Online,
49,Esports,Audition,??ng ??i,5/19/2026,19:30,20:00,Audition - Vng B?ng,Audition - Team Battle - L??t 1 - Tr?n 1,,,,"Normal Match
Livestream",Online,
50,Esports,Audition,??ng ??i,5/19/2026,20:00,20:30,Audition - Vng B?ng,Audition - Team Battle - L??t 1 - Tr?n 2,,,,"Normal Match
Livestream",Online,
51,Esports,Audition,C nhn,5/26/2026,18:30,19:00,Audition - Vng B?ng,Audition - Nh?y ??n Crazy4 - L??t 2 - B?ng A,,,,"Normal Match
Livestream",Online,
52,Esports,Audition,C nhn,5/26/2026,19:00,19:30,Audition - Vng B?ng,Audition - Nh?y ??n Crazy4 - L??t 2 - B?ng B,,,,"Normal Match
Livestream",Online,
53,Esports,Audition,??ng ??i,5/26/2026,19:30,20:00,Audition - Vng B?ng,Audition - Team Battle - l??t 2 - Tr?n 1,,,,"Normal Match
Livestream",Online,
54,Esports,Audition,??ng ??i,5/26/2026,20:00,20:30,Audition - Vng B?ng,Audition - Team Battle - L??t 2 - Tr?n 2,,,,"Normal Match
Livestream",Online,
55,Esports,Audition,C nhn,6/9/2026,18:30,19:00,Audition - Vng Chung K?t,Audition - Nh?y ??n Crazy4 - Vng Chung k?t,,,,"Final Match
Livestream",Online,
56,Esports,Audition,??ng ??i,6/9/2026,19:00,19:30,Audition - Vng Chung K?t,Audition - Team Battle - Vng Chung k?t,,,,"Final Match
Livestream",Online,
57,Esports,FC 26,C nhn,6/18/2026,18:00,18:15,FC 26 - Vng B?ng,FC 26 - B?ng A - L??t 1 - Tr?n 1,,,,Normal Match,Offline at Havana,
58,Esports,FC 26,C nhn,6/18/2026,18:15,18:30,FC 26 - Vng B?ng,FC 26 - B?ng B - L??t 1 - Tr?n 1,,,,Normal Match,Offline at Havana,
59,Esports,FC 26,C nhn,6/18/2026,18:30,18:45,FC 26 - Vng B?ng,FC 26 - B?ng A - L??t 1 - Tr?n 2,,,,Normal Match,Offline at Havana,
60,Esports,FC 26,C nhn,6/18/2026,18:45,19:00,FC 26 - Vng B?ng,FC 26 - B?ng B - L??t 1 - Tr?n 2,,,,Normal Match,Offline at Havana,
61,Esports,FC 26,C nhn,6/25/2026,18:00,18:15,FC 26 - Vng B?ng,FC 26 - B?ng A - L??t 2 - Tr?n 1,,,,Normal Match,Offline at Havana,
62,Esports,FC 26,C nhn,6/25/2026,18:15,18:30,FC 26 - Vng B?ng,FC 26 - B?ng B - L??t 2 - Tr?n 1,,,,Normal Match,Offline at Havana,
63,Esports,FC 26,C nhn,6/25/2026,18:30,18:45,FC 26 - Vng B?ng,FC 26 - B?ng A - L??t 2 - Tr?n 2,,,,Normal Match,Offline at Havana,
64,Esports,FC 26,C nhn,6/25/2026,18:45,19:00,FC 26 - Vng B?ng,FC 26 - B?ng B - L??t 2 - Tr?n 2,,,,Normal Match,Offline at Havana,
65,Esports,FC 26,C nhn,7/2/2026,18:00,18:15,FC 26 - Vng B?ng,FC 26 - B?ng A - L??t 3 - Tr?n 1,,,,Normal Match,Offline at Havana,
66,Esports,FC 26,C nhn,7/2/2026,18:15,18:30,FC 26 - Vng B?ng,FC 26 - B?ng B - L??t 3 - Tr?n 1,,,,Normal Match,Offline at Havana,
67,Esports,FC 26,C nhn,7/2/2026,18:30,18:45,FC 26 - Vng B?ng,FC 26 - B?ng A - L??t 3 - Tr?n 2,,,,Normal Match,Offline at Havana,
68,Esports,FC 26,C nhn,7/2/2026,18:45,19:00,FC 26 - Vng B?ng,FC 26 - B?ng B - L??t 3 - Tr?n 2,,,,Normal Match,Offline at Havana,
69,Esports,FC 26,C nhn,7/9/2026,18:00,18:45,FC 26 - Vng Lo?i Tr?c Ti?p,FC 26 - Vng Bn k?t - Bn k?t 1,,,,Key Match,Offline at Havana,
70,Esports,FC 26,C nhn,7/9/2026,18:45,19:30,FC 26 - Vng Lo?i Tr?c Ti?p,FC 26 - Vng Bn k?t - Bn k?t 2,,,,Key Match,Offline at Havana,
71,Esports,FC 26,C nhn,7/16/2026,18:30,19:30,FC 26 - Vng Chung K?t,FC 26 - Tr?n Chung k?t,,,,Final Match,Offline at Havana,
72,Esports,Lin Qun,??ng ??i,6/15/2026,18:30,19:30,Lin Qun - Vng B?ng,Lin Qun - L??t 1,,,,"Normal Match
Livestream",Online,
73,Esports,Lin Qun,??ng ??i,6/19/2026,18:30,19:30,Lin Qun - Vng B?ng,Lin Qun - L??t 2,,,,"Normal Match
Livestream",Online,
74,Esports,Lin Qun,??ng ??i,6/22/2026,18:30,19:30,Lin Qun - Vng B?ng,Lin Qun - L??t 3,,,,"Normal Match
Livestream",Online,
75,Esports,Lin Qun,??ng ??i,6/26/2026,18:30,19:30,Lin Qun - Vng Bn K?t,Lin Qun - Bn k?t,,,,"Key Match
Livestream",Online,
76,Esports,Lin Qun,??ng ??i,6/29/2026,18:30,20:00,Lin Qun - Vng Chung K?t,Lin Qun - Tr?n Chung k?t,,,,"Final Match
Livestream",Online,
77,Esports,Mario Kart,C nhn,7/3/2026,18:00,18:20,Mario Kart  - Vng Lo?i Tr?c Ti?p,Mario Kart - Vng T? k?t - T? k?t 1,,,,Key Match,Offline at Havana,
78,Esports,Mario Kart,C nhn,7/3/2026,18:20,18:40,Mario Kart  - Vng Lo?i Tr?c Ti?p,Mario Kart - Vng T? k?t - T? k?t 2,,,,Key Match,Offline at Havana,
79,Esports,Mario Kart,C nhn,7/3/2026,18:40,19:00,Mario Kart  - Vng Lo?i Tr?c Ti?p,Mario Kart - Vng T? k?t - T? k?t 3,,,,Key Match,Offline at Havana,
80,Esports,Mario Kart,C nhn,7/3/2026,19:00,19:20,Mario Kart  - Vng Lo?i Tr?c Ti?p,Mario Kart - Vng T? k?t - T? k?t 4,,,,Key Match,Offline at Havana,
81,Esports,Mario Kart,C nhn,7/10/2026,18:00,18:30,Mario Kart  - Vng Lo?i Tr?c Ti?p,Mario Kart - Vng Bn k?t - Bn k?t 1,,,,Key Match,Offline at Havana,
82,Esports,Mario Kart,C nhn,7/10/2026,18:30,19:00,Mario Kart  - Vng Lo?i Tr?c Ti?p,Mario Kart - Vng Bn k?t - Bn k?t 2,,,,Key Match,Offline at Havana,
83,Esports,Mario Kart,C nhn,7/17/2026,18:30,19:30,Mario Kart - Vng Chung K?t,Mario Kart - Tr?n Chung k?t,,,,Final Match,Offline at Havana,
84,C?u Lng,C?u Lng - Thi ??u H?n H?p,??ng ??i,6/13/2026,17:30,19:30,C?u Lng - League,C?u Lng - L??t 1,,,,Key Match,Offline at Stadium/Club,
85,C?u Lng,C?u Lng - Thi ??u H?n H?p,??ng ??i,6/14/2026,17:30,19:30,C?u Lng - League,C?u Lng - L??t 2,,,,Key Match,Offline at Stadium/Club,
86,C?u Lng,C?u Lng - Thi ??u H?n H?p,??ng ??i,6/20/2026,17:30,19:30,C?u Lng - League,C?u Lng - L??t 3,,,,Key Match,Offline at Stadium/Club,
87,C?u Lng,C?u Lng - Thi ??u H?n H?p,??ng ??i,6/21/2026,17:30,19:30,C?u Lng - League,C?u Lng - L??t 4,,,,Key Match,Offline at Stadium/Club,
88,Bida,Bida - Pool 9 Bi,C nhn,7/7/2026,18:30,19:00,Pool 9 Bi - Vng Lo?i Tr?c Ti?p,Carom Libre (0 Ph?ng) - Vng T? k?t - T? k?t 1,,,,Key Match,Offline at Stadium/Club,
89,Bida,Bida - Pool 9 Bi,C nhn,7/7/2026,19:00,19:30,Pool 9 Bi - Vng Lo?i Tr?c Ti?p,Carom Libre (0 Ph?ng) - Vng T? k?t - T? k?t 2,,,,Key Match,Offline at Stadium/Club,
90,Bida,Bida - Pool 9 Bi,C nhn,7/7/2026,19:30,20:00,Carom Libre (0 Ph?ng) - Vng Lo?i Tr?c Ti?p,Carom Libre (0 Ph?ng) - Vng T? k?t - T? k?t 3,,,,Key Match,Offline at Stadium/Club,
91,Bida,Bida - Pool 9 Bi,C nhn,7/7/2026,20:00,20:30,Carom Libre (0 Ph?ng) - Vng Lo?i Tr?c Ti?p,Carom Libre (0 Ph?ng) - Vng T? k?t - T? k?t 4,,,,Key Match,Offline at Stadium/Club,
92,Bida,Bida - Pool 9 Bi,C nhn,7/15/2026,18:30,19:15,Carom Libre (0 Ph?ng) - Vng Lo?i Tr?c Ti?p,Carom Libre (0 Ph?ng) - Vng Bn k?t - Bn k?t 1,,,,Key Match,Offline at Stadium/Club,
93,Bida,Bida - Pool 9 Bi,C nhn,7/15/2026,19:15,20:00,Carom Libre (0 Ph?ng) - Vng Lo?i Tr?c Ti?p,Carom Libre (0 Ph?ng) - Vng Bn k?t - Bn k?t 2,,,,Key Match,Offline at Stadium/Club,
94,Bida,Bida - Pool 9 Bi,C nhn,7/21/2026,18:30,19:30,Carom Libre (0 Ph?ng) - Vng Chung K?t,Carom Libre (0 Ph?ng) - Tr?n Chung k?t,,,,Final Match,Offline at Stadium/Club,
95,Bng ?,Bng ? Sn 5,??ng ??i,7/1/2026,19:00,20:00,Bng ? - Vng Lo?i,Bng ? - L??t 1,,,,"Key Match
Livestream",Offline at Stadium/Club,
96,Bng ?,Bng ? Sn 5,??ng ??i,7/8/2026,19:00,20:00,Bng ? - Vng Lo?i,Bng ? - L??t 2,,,,"Key Match
Livestream",Offline at Stadium/Club,
97,Bng ?,Bng ? Sn 5,??ng ??i,7/15/2026,19:00,20:00,Bng ? - Vng Lo?i,Bng ? - L??t 3,,,,"Key Match
Livestream",Offline at Stadium/Club,
98,Bng ?,Bng ? Sn 5,??ng ??i,7/22/2026,19:00,20:00,Bng ? - Vng Chung K?t,Bng ? - Vng Chung K?t,,,,"Final Match
Livestream",Offline at Stadium/Club,"""

def get_sport_id(sport_name, category):
    s = sport_name.lower()
    c = category.lower()
    if 'chess' in s or 'c? vua' in s or 'cờ vua' in s:
        if 'caro' in c: return 1
        if 'domino' in c: return 2
    if 'esport' in s or 'thể thao điện tử' in s:
        if 'audition' in c: return 3
        if 'fc 26' in c: return 4
        if 'li' in s or 'arena' in c or 'lin qun' in s: return 5
        if 'mario' in c: return 6
    if 'c?u l' in s or 'badminton' in s or 'cầu lông' in s: return 7
    if 'bida' in s or 'billiards' in s or 'pool' in s: return 8
    if 'bng ?' in s or 'football' in s or 'bóng đá' in s: return 9
    return 1

matches = []
reader = csv.DictReader(raw_data.splitlines())
for row in reader:
    sport_id = get_sport_id(row['Sport Name'], row['Category'])
    team_a = row['Athlete/Team A'] or "TBD"
    team_b = row['Athlete/Team B'] or "TBD"
    
    result = row['Result']
    score_a = ""
    score_b = ""
    status = 'upcoming'
    
    if result and '-' in result:
        parts = result.split('-')
        score_a = parts[0].strip()
        score_b = parts[1].strip()
        status = 'finished'
    
    # Date parse: 5/20/2026 -> 2026-05-20
    date_parts = row['Date'].split('/')
    if len(date_parts) == 3:
        formatted_date = f"{date_parts[2]}-{date_parts[0].zfill(2)}-{date_parts[1].zfill(2)}"
    else:
        formatted_date = "2026-05-01"
        
    timestamp = f"{formatted_date}T{row['Start']}:00"
    
    matches.append({
        "id": f"m-{row['No']}",
        "sportId": sport_id,
        "teamA": team_a,
        "teamB": team_b,
        "scoreA": score_a,
        "scoreB": score_b,
        "status": status,
        "timestamp": timestamp,
        "stage": row['Event Name']
    })

print(json.dumps(matches, indent=2))
