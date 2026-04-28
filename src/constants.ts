import { Sport, Athlete, Match, CountryMedal } from './types';

export const SPORTS: Sport[] = [
  {
    id: 1,
    name: "Chess",
    name_vi: "Cờ vua",
    category: "Caro",
    category_vi: "Cờ Caro",
    format: "Individual",
    format_vi: "Cá nhân",
    description: "The Ultimate Mind Game!\nA battle of pure intellect and foresight. Compete on a 20x20 grid where the goal is simple yet deeply challenging: align five unbroken pieces to win. With a strict 10-minute chess clock per player and Best-of-3 matches, every single move counts. Stay focused, trap your opponent, and shout \"Caro!\"",
    description_vi: "Trò chơi trí tuệ đỉnh cao!\nCuộc chiến của trí tuệ và tầm nhìn. Thi đấu trên bàn cờ 20x20 với mục tiêu đơn giản nhưng đầy thử thách: xếp 5 quân cờ liên tiếp để giành chiến thắng. Với đồng hồ 10 phút mỗi bên và đấu BO3, mỗi nước đi đều quan trọng. Hãy tập trung và hô vang \"Caro!\"",
    rules: "Group Stage\nKnock-out Stage",
    rules_vi: "Vòng bảng\nVòng loại",
    icon: "Trophy"
  },
  {
    id: 2,
    name: "Chess",
    name_vi: "Cờ vua",
    category: "Domino",
    category_vi: "Domino",
    format: "Individual",
    format_vi: "Cá nhân",
    description: "Calculated Chaos!\nNot just a game of luck, but a true mental duel. This 1v1 Dominoes tournament will test your memory, strategy, and ability to force your opponent to draw from the Boneyard. Battle through Best-of-5 group stages and survive the grueling Best-of-9 finals to become the undisputed Domino Master of Groovelympics.",
    description_vi: "Sự hỗn loạn có tính toán!\nKhông chỉ là may mắn, đây là cuộc đấu trí thực sự. Giải đấu 1v1 này sẽ kiểm tra trí nhớ, chiến thuật và khả năng dồn đối thủ vào thế bí. Chiến đấu qua vòng bảng BO5 và chung kết BO9 để trở thành bậc thầy Domino.",
    rules: "Group Stage\nKnock-out Stage",
    rules_vi: "Vòng bảng\nVòng loại",
    icon: "Grid3X3"
  },
  {
    id: 3,
    name: "Esports",
    name_vi: "Thể thao điện tử",
    category: "Audition",
    category_vi: "Audition",
    format: "Individual & Team",
    format_vi: "Cá nhân & Đồng đội",
    description: "Rhythm & Reflexes!\nGet ready to hit the dance floor! Showcase your rhythm and lightning-fast reflexes in the Audition tournament. Compete for individual glory in the Solo \"Crazy 4 Keys\" category, or sync up with a partner for the ultimate Couple/Team Battle. With BPMs rising to 188+, only the most precise dancers will claim the gold.",
    description_vi: "Nhịp điệu và phản xạ!\nSẵn sàng khuấy động sàn nhảy! Thể hiện nhịp điệu và phản xạ nhanh như chớp. Thi đấu cá nhân ở thể loại \"Crazy 4 Keys\" hoặc phối hợp cùng đồng đội trong các trận đấu Couple/Team Battle. Với BPM lên tới 188+, chỉ những vũ công chính xác nhất mới có thể giành vàng.",
    rules: "Group Stage\nKnock-out Stage",
    rules_vi: "Vòng bảng\nVòng loại",
    icon: "Music"
  },
  {
    id: 4,
    name: "Esports",
    name_vi: "Thể thao điện tử",
    category: "FC 26",
    category_vi: "FC 26",
    format: "Individual",
    format_vi: "Cá nhân",
    description: "Virtual Pitch, Real Glory!\nExperience the thrill of the pitch on the PS5! Eight players will clash in a premier offline tournament, starting with a fierce group stage and advancing to nail-biting Best-of-3 knockouts. Bring your best Tactical Defending, execute perfect plays, and score your way to the championship title.",
    description_vi: "Sân cỏ ảo, vinh quang thực!\nTrải nghiệm kịch tính trên PS5! 8 người chơi sẽ đối đầu trong giải đấu offline, bắt đầu từ vòng bảng và tiến tới vòng loại BO3 kịch tính. Thể hiện kỹ năng phòng ngự và ghi bàn để bước tới ngôi vô địch.",
    rules: "Group Stage\nKnock-out Stage",
    rules_vi: "Vòng bảng\nVòng loại",
    icon: "Gamepad2"
  },
  {
    id: 5,
    name: "Esports",
    name_vi: "Thể thao điện tử",
    category: "Arena of Valor",
    category_vi: "Liên Quân Mobile",
    format: "Team",
    format_vi: "Đồng đội",
    description: "Battle of the Legends!\nAssemble your squad and enter the Antaris Battlefield! This 5v5 MOBA showdown features a grueling Double Round-Robin group stage, leading up to an intense \"King of the Hill\" finale. Strategy, flawless teamwork, and precise ban/pick phases are your keys to victory in these high-stakes BO1 matches.",
    description_vi: "Trận chiến của những huyền thoại!\nTập hợp đội hình và tiến vào chiến trường Antaris! Trận đấu 5v5 MOBA với vòng bảng vòng tròn kép tính điểm, tiến tới vòng chung kết King of the Hill. Chiến thuật, tinh thần đồng đội và cấm/chọn chính xác là chìa khóa chiến thắng.",
    rules: "League\nFinal Round",
    rules_vi: "Vòng bảng tính điểm\nVòng chung kết",
    icon: "Swords"
  },
  {
    id: 6,
    name: "Esports",
    name_vi: "Thể thao điện tử",
    category: "Mario Kart",
    category_vi: "Mario Kart",
    format: "Individual",
    format_vi: "Cá nhân",
    description: "Drift, Dodge, and Destroy!\nRev your engines for the ultimate test of speed and friendship-ruining fun! Compete in intense 1v1 split-screen races at 150cc. Navigate sharp turns, dodge Red Shells, and survive the chaotic \"Frantic Items\" in the finals. Expect high-speed drifts, sudden death tie-breakers, and epic last-second comebacks.",
    description_vi: "Drift và bứt tốc!\nNhấn ga cho bài kiểm tra tốc độ cuối cùng! Thi đấu 1v1 màn hình chia đôi ở mức 150cc. Vượt qua những khúc cua gắt, né tránh mai đỏ và sống sót qua những vật phẩm hỗn loạn. Đón chờ những màn bám đuổi nghẹt thở và lội ngược dòng phút chót.",
    rules: "Knock-out Stage",
    rules_vi: "Vòng loại",
    icon: "Zap"
  },
  {
    id: 7,
    name: "Badminton",
    name_vi: "Cầu lông",
    category: "Mixed",
    category_vi: "Đồng đội nam nữ",
    format: "Team",
    format_vi: "Đồng đội",
    description: "United We Smash!\nTeamwork makes the dream work! Inspired by the Sudirman Cup, this mixed team event features two squads of men and women battling it out across 5 unique sets: Men's Singles, Women's Singles, Mixed Doubles, Women's Doubles, and Men's Doubles. Bring your best swings and secure glory for your team!",
    description_vi: "Đoàn kết để chiến thắng!\nSức mạnh tập thể! Lấy cảm hứng từ Sudirman Cup, nội dung đồng đội hỗn hợp gồm 5 trận đấu: Đơn nam, Đơn nữ, Đôi nam nữ, Đôi nữ và Đôi nam. Hãy cống hiến những cú đập cầu uy lực nhất để giành vinh quang cho đội!",
    rules: "League",
    rules_vi: "Vòng bảng tính điểm",
    location: "Badminton Court: 26 Luong Dinh Cua, An Khanh",
    location_vi: "Sân cầu lông: 26 Lương Định Của, An Khánh",
    icon: "Activity"
  },
  {
    id: 8,
    name: "Billiards",
    name_vi: "Billiards",
    category: "Pool 9 Ball",
    category_vi: "Pool 9 bi",
    format: "Individual",
    format_vi: "Cá nhân",
    description: "Run the Table!\nStep up to the table for an intense 9-Ball Pool knockout tournament. In this fast-paced game of precision and cue ball control, you must always strike the lowest numbered ball first, but only sinking the 9-ball brings victory. Plan your shots, master your breaks, and pocket your way to the championship title!",
    description_vi: "Làm chủ bàn đấu!\nTiến tới bàn đấu để tham gia giải Pool 9 bi loại. Trong trò chơi tốc độ và độ chính xác này, bạn phải chạm bi mục tiêu có số thấp nhất trước, nhưng chỉ khi đưa bi 9 vào lỗ mới giành chiến thắng. Hãy tính toán từng đường cơ để lên ngôi vô địch!",
    rules: "Knock-out Stage",
    rules_vi: "Vòng loại",
    icon: "CircleDot"
  },
  {
    id: 9,
    name: "Football",
    name_vi: "Bóng đá",
    category: "Mini-Field",
    category_vi: "Bóng đá mini",
    format: "Team",
    format_vi: "Đồng đội",
    description: "Pace, Power, and Pitch Perfection\nLace up your boots for the beautiful game in its fastest form! This 5-a-side Mini Football tournament demands quick feet, tighter control, and relentless teamwork. From lightning-fast counterattacks to rock-solid defending, every second on the turf counts. Bring your passion, dominate the pitch, and lead your squad to the Groovelympics Cup!",
    description_vi: "Tốc độ và sức mạnh!\nxỏ giày vào sân cho môn thể thao vua phiên bản 5 người! Giải đấu bóng đá mini đòi hỏi sự linh hoạt, kiểm soát bóng tốt và tinh thần đồng đội nỗ lực. Từ những pha phản công thần tốc đến lối phòng ngự vững chãi, mỗi giây trên sân đều quý giá. Hãy dẫn dắt đội bóng của bạn tới cúp vô địch Groovelympics!",
    rules: "League\nFinal Round",
    rules_vi: "Vòng bảng tính điểm\nVòng chung kết",
    location: "Football Pitch: 516 Pham Van Dong, Binh Loi Trung",
    location_vi: "Sân bóng đá: 516 Phạm Văn Đồng, Bình Lợi Trung",
    icon: "Dribbble"
  }
];

export const ATHLETES: Athlete[] = [
  { id: '1', name: 'Nguyen Van A', country: 'Vietnam', sportId: 1, image: 'https://picsum.photos/seed/nva/200/200' },
  { id: '2', name: 'John Doe', country: 'USA', sportId: 9, image: 'https://picsum.photos/seed/jdoe/200/200' },
  { id: '3', name: 'Lee Min Ho', country: 'Korea', sportId: 5, image: 'https://picsum.photos/seed/lmh/200/200' },
  { id: '4', name: 'Tran Thi B', country: 'Vietnam', sportId: 7 },
  { id: '5', name: 'Alex Turner', country: 'UK', sportId: 3 },
  { id: '6', name: 'Hiroshi Sato', country: 'Japan', sportId: 2, image: 'https://picsum.photos/seed/hs/200/200' },
  { id: '7', name: 'Zhang Wei', country: 'China', sportId: 8 },
  { id: '8', name: 'Maria Garcia', country: 'Spain', sportId: 4, image: 'https://picsum.photos/seed/mg/200/200' },
];

export const MATCHES: Match[] = [
  // Chess - Caro (ID 1)
  { id: 'm-1', sportId: 1, teamA: 'Tuan Nguyen', teamB: 'Dinh Nguyen', scoreA: 1, scoreB: 0, status: 'finished', timestamp: '2026-05-20T18:00:00', stage: 'Caro - Vòng Bảng' },
  { id: 'm-2', sportId: 1, teamA: 'Hoang Lam', teamB: 'Gia Huy', scoreA: 2, scoreB: 1, status: 'live', timestamp: '2026-05-20T18:00:00', stage: 'Caro - Vòng Bảng' },
  { id: 'm-3', sportId: 1, teamA: 'Thanh Tung', teamB: 'Minh Khai', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-05-20T18:30:00', stage: 'Caro - Vòng Bảng' },
  { id: 'm-4', sportId: 1, teamA: 'Quoc Anh', teamB: 'Bao Nam', scoreA: 3, scoreB: 2, status: 'live', timestamp: '2026-05-20T18:30:00', stage: 'Caro - Vòng Bảng' },
  { id: 'm-5', sportId: 1, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-05-21T18:00:00', stage: 'Caro - Vòng Bảng' },
  { id: 'm-6', sportId: 1, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-05-21T18:00:00', stage: 'Caro - Vòng Bảng' },
  { id: 'm-7', sportId: 1, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-05-21T18:30:00', stage: 'Caro - Vòng Bảng' },
  { id: 'm-8', sportId: 1, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-05-21T18:30:00', stage: 'Caro - Vòng Bảng' },
  { id: 'm-31', sportId: 1, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-06-11T18:30:00', stage: 'Caro - Vòng Chung Kết' },

  // Chess - Domino (ID 2)
  { id: 'm-32', sportId: 2, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-05-22T18:00:00', stage: 'Domino - Vòng Bảng' },
  { id: 'm-46', sportId: 2, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-06-12T18:30:00', stage: 'Domino - Vòng Chung Kết' },

  // Esports - Audition (ID 3)
  { id: 'm-47', sportId: 3, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-05-19T18:30:00', stage: 'Audition - Vòng Bảng' },
  { id: 'm-56', sportId: 3, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-06-09T19:00:00', stage: 'Audition - Vòng Chung Kết' },

  // Esports - FC 26 (ID 4)
  { id: 'm-57', sportId: 4, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-06-18T18:00:00', stage: 'FC 26 - Vòng Bảng' },
  { id: 'm-71', sportId: 4, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-07-16T18:30:00', stage: 'FC 26 - Vòng Chung Kết' },

  // Esports - Arena of Valor (ID 5)
  { id: 'm-72', sportId: 5, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-06-15T18:30:00', stage: 'Liên Quân - Vòng Bảng' },
  { id: 'm-76', sportId: 5, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-06-29T18:30:00', stage: 'Liên Quân - Vòng Chung Kết' },

  // Esports - Mario Kart (ID 6)
  { id: 'm-77', sportId: 6, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-07-03T18:00:00', stage: 'Mario Kart - Vòng Loại' },
  { id: 'm-83', sportId: 6, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-07-17T18:30:00', stage: 'Mario Kart - Vòng Chung Kết' },

  // Badminton (ID 7)
  { id: 'm-84', sportId: 7, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-06-13T17:30:00', stage: 'Cầu Lông - League' },
  { id: 'm-87', sportId: 7, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-06-21T17:30:00', stage: 'Cầu Lông - League' },

  // Billiards (ID 8)
  { id: 'm-88', sportId: 8, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-07-07T18:30:00', stage: 'Pool 9 Bi - Vòng Loại' },
  { id: 'm-94', sportId: 8, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-07-21T18:30:00', stage: 'Pool 9 Bi - Vòng Chung Kết' },

  // Football (ID 9)
  { id: 'm-95', sportId: 9, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-07-01T19:00:00', stage: 'Bóng Đá - Vòng Loại' },
  { id: 'm-98', sportId: 9, teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', status: 'upcoming', timestamp: '2026-07-22T19:00:00', stage: 'Bóng Đá - Vòng Chung Kết' },
];

export const MEDALS: CountryMedal[] = [
  { country: 'Vietnam', gold: 12, silver: 8, bronze: 5 },
  { country: 'Thailand', gold: 10, silver: 12, bronze: 8 },
  { country: 'Indonesia', gold: 8, silver: 5, bronze: 10 },
  { country: 'Singapore', gold: 5, silver: 7, bronze: 4 },
  { country: 'Malaysia', gold: 4, silver: 3, bronze: 9 },
];

export const SPORT_STANDINGS: Record<number, { team: string, played: number, points: number }[]> = {
  9: [ // Football
    { team: 'Vietnam', played: 3, points: 9 },
    { team: 'Thailand', played: 3, points: 6 },
    { team: 'Indonesia', played: 3, points: 3 },
    { team: 'Malaysia', played: 3, points: 0 },
  ],
  5: [ // Arena of Valor
    { team: 'Team Secret', played: 2, points: 6 },
    { team: 'Team Flash', played: 2, points: 3 },
    { team: 'Saigon Phantom', played: 2, points: 3 },
    { team: 'V Gaming', played: 2, points: 0 },
  ]
};
