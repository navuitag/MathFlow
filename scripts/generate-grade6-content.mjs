import { writeFile } from "node:fs/promises";

const lessons = [
  ["nat_set", "Bài 1. Tập hợp", "Tập hợp các số tự nhiên", "Nhận biết tập hợp, phần tử và cách mô tả bằng liệt kê hoặc tính chất.", "set"],
  ["nat_notation", "Bài 2. Cách ghi số tự nhiên", "Tập hợp các số tự nhiên", "Đọc, viết số tự nhiên theo hàng, lớp và hệ thập phân.", "place"],
  ["nat_order", "Bài 3. Thứ tự trong tập hợp các số tự nhiên", "Tập hợp các số tự nhiên", "So sánh, sắp xếp và dùng tia số cho số tự nhiên.", "numberLine"],
  ["nat_add_sub", "Bài 4. Phép cộng và phép trừ số tự nhiên", "Tập hợp các số tự nhiên", "Tính tổng, hiệu và kiểm tra kết quả bằng quan hệ ngược.", "arithmetic"],
  ["nat_mul_div", "Bài 5. Phép nhân và phép chia số tự nhiên", "Tập hợp các số tự nhiên", "Tính tích, thương, số dư và chọn phép tính phù hợp.", "arithmetic"],
  ["nat_power", "Bài 6. Lũy thừa với số mũ tự nhiên", "Tập hợp các số tự nhiên", "Hiểu lũy thừa là phép nhân lặp và tính giá trị đơn giản.", "power"],
  ["nat_order_ops", "Bài 7. Thứ tự thực hiện các phép tính", "Tập hợp các số tự nhiên", "Thực hiện phép tính theo đúng thứ tự: ngoặc, lũy thừa, nhân chia, cộng trừ.", "pemdas"],

  ["div_relation", "Bài 8. Quan hệ chia hết và tính chất", "Tính chia hết", "Nhận biết a chia hết cho b và vận dụng tính chất chia hết của tổng, hiệu.", "divisibility"],
  ["div_signs", "Bài 9. Dấu hiệu chia hết", "Tính chia hết", "Dùng dấu hiệu chia hết cho 2, 3, 5, 9 để kiểm tra nhanh.", "divisibility"],
  ["prime_numbers", "Bài 10. Số nguyên tố", "Tính chia hết", "Phân biệt số nguyên tố, hợp số và phân tích số ra thừa số nguyên tố.", "factor"],
  ["gcd", "Bài 11. Ước chung. Ước chung lớn nhất", "Tính chia hết", "Tìm ước chung, ước chung lớn nhất bằng liệt kê hoặc phân tích thừa số.", "factor"],
  ["lcm", "Bài 12. Bội chung. Bội chung nhỏ nhất", "Tính chia hết", "Tìm bội chung, bội chung nhỏ nhất và ứng dụng vào bài toán chu kì.", "factor"],

  ["int_set", "Bài 13. Tập hợp các số nguyên", "Số nguyên", "Hiểu số nguyên âm, số 0, số nguyên dương trong các tình huống thực tế.", "numberLine"],
  ["int_order", "Bài 14. So sánh số nguyên", "Số nguyên", "So sánh số nguyên bằng trục số và giá trị tuyệt đối.", "numberLine"],
  ["int_add_sub", "Bài 15. Phép cộng và phép trừ số nguyên", "Số nguyên", "Cộng, trừ số nguyên bằng quy tắc dấu và mô hình dịch chuyển.", "numberLine"],
  ["int_mul_div", "Bài 16. Phép nhân và phép chia số nguyên", "Số nguyên", "Nhân, chia số nguyên và xác định dấu của kết quả.", "integerOps"],
  ["int_divisibility", "Bài 17. Phép chia hết. Ước và bội của một số nguyên", "Số nguyên", "Mở rộng khái niệm ước, bội và chia hết sang số nguyên.", "integerOps"],

  ["shape_regular", "Bài 18. Tam giác đều, hình vuông, lục giác đều", "Một số hình phẳng trong thực tiễn", "Nhận biết cạnh, góc và tính chất đều của các hình quen thuộc.", "geometry"],
  ["shape_quads", "Bài 19. Hình chữ nhật, hình thoi, hình bình hành, hình thang cân", "Một số hình phẳng trong thực tiễn", "Phân biệt các tứ giác đặc biệt qua cạnh, góc và đường chéo.", "geometry"],
  ["shape_perimeter_area", "Bài 20. Chu vi và diện tích của một số tứ giác đã học", "Một số hình phẳng trong thực tiễn", "Tính chu vi, diện tích hình chữ nhật, hình vuông, hình thoi, hình bình hành và hình thang.", "geometry"],

  ["sym_axis", "Bài 21. Hình có trục đối xứng", "Tính đối xứng của hình phẳng", "Nhận ra trục đối xứng và kiểm tra hai nửa hình có chồng khít không.", "symmetry"],
  ["sym_center", "Bài 22. Hình có tâm đối xứng", "Tính đối xứng của hình phẳng", "Nhận ra tâm đối xứng qua phép quay nửa vòng.", "symmetry"],

  ["fraction_equal", "Bài 23. Mở rộng phân số. Phân số bằng nhau", "Phân số", "Mở rộng phân số, nhận biết phân số bằng nhau qua nhân hoặc chia cùng một số.", "fractionCompare"],
  ["fraction_compare", "Bài 24. So sánh phân số. Hỗn số dương", "Phân số", "So sánh phân số, đọc hiểu hỗn số dương và đặt trên trục số.", "numberLine"],
  ["fraction_add_sub", "Bài 25. Phép cộng và phép trừ phân số", "Phân số", "Cộng, trừ phân số cùng mẫu hoặc khác mẫu bằng quy đồng.", "fractionBar"],
  ["fraction_mul_div", "Bài 26. Phép nhân và phép chia phân số", "Phân số", "Nhân, chia phân số và rút gọn kết quả.", "fractionBar"],
  ["fraction_two_problems", "Bài 27. Hai bài toán về phân số", "Phân số", "Tìm giá trị phân số của một số và tìm một số khi biết giá trị phân số của nó.", "fractionBar"],

  ["decimal_intro", "Bài 28. Số thập phân", "Số thập phân", "Đọc, viết, so sánh số thập phân và liên hệ với phân số thập phân.", "numberLine"],
  ["decimal_ops", "Bài 29. Tính toán với số thập phân", "Số thập phân", "Cộng, trừ, nhân, chia số thập phân trong các tình huống đo lường.", "arithmetic"],
  ["decimal_round", "Bài 30. Làm tròn và ước lượng", "Số thập phân", "Làm tròn số và ước lượng kết quả để kiểm tra tính hợp lí.", "estimate"],
  ["ratio_percent", "Bài 31. Một số bài toán về tỉ số và tỉ số phần trăm", "Số thập phân", "Tính tỉ số, phần trăm và vận dụng vào giảm giá, lãi suất, dữ liệu.", "percent"],

  ["point_line", "Bài 32. Điểm và đường thẳng", "Hình học cơ bản", "Nhận biết điểm thuộc đường thẳng, ba điểm thẳng hàng và cách kí hiệu.", "geometry"],
  ["three_points", "Bài 33. Điểm nằm giữa hai điểm. Tia", "Hình học cơ bản", "Mô tả điểm nằm giữa, tia gốc và hai tia đối nhau.", "geometry"],
  ["segment_length", "Bài 34. Đoạn thẳng. Độ dài đoạn thẳng", "Hình học cơ bản", "Đo, so sánh độ dài đoạn thẳng và dùng đơn vị phù hợp.", "geometry"],
  ["midpoint", "Bài 35. Trung điểm của đoạn thẳng", "Hình học cơ bản", "Xác định trung điểm bằng điều kiện nằm giữa và hai đoạn bằng nhau.", "geometry"],

  ["data_collect", "Bài 36. Thu thập và tổ chức dữ liệu", "Dữ liệu và xác suất thực nghiệm", "Thu thập, phân loại dữ liệu và trình bày bằng bảng.", "data"],
  ["data_chart", "Bài 37. Biểu diễn dữ liệu bằng bảng và biểu đồ", "Dữ liệu và xác suất thực nghiệm", "Đọc, vẽ và nhận xét biểu đồ tranh, cột, cột kép.", "chart"],
  ["data_analysis", "Bài 38. Mô tả và so sánh dữ liệu", "Dữ liệu và xác suất thực nghiệm", "Tính toán, so sánh và rút ra nhận xét từ dữ liệu.", "chart"],
  ["probability_exp", "Bài 39. Xác suất thực nghiệm trong một số trò chơi và thí nghiệm đơn giản", "Dữ liệu và xác suất thực nghiệm", "Tính xác suất thực nghiệm bằng tỉ số số lần xảy ra trên tổng số lần thử.", "probability"]
];

const chapters = [...new Set(lessons.map((lesson) => lesson[2]))];

function skillFromLesson(item, index) {
  const [id, title, chapter, description, visualization] = item;
  return {
    id,
    title,
    grade: 6,
    book: index < 22 ? "Tập 1" : "Tập 2",
    chapter,
    chapterIndex: chapters.indexOf(chapter) + 1,
    lessonNo: index + 1,
    domain: chapter,
    level: index < 12 ? 1 : index < 27 ? 2 : 3,
    prerequisite: index === 0 ? [] : [lessons[index - 1][0]],
    description,
    visualization
  };
}

function lessonSteps(item) {
  const [id, title, chapter, description, visualization] = item;
  const core = coreIdea(id, title, chapter);
  return [
    {
      type: "intro",
      title: "Mục tiêu vi kỹ năng",
      content: description
    },
    {
      type: "visualization",
      title: core.visualTitle,
      content: core.visualContent,
      visualization,
      numerator: core.numerator || 3,
      denominator: core.denominator || 4
    },
    {
      type: "example",
      title: "Ví dụ tự tạo",
      content: core.example
    },
    {
      type: "summary",
      title: "Ghi nhớ nhanh",
      content: core.summary
    }
  ];
}

function coreIdea(id, title, chapter) {
  const map = {
    nat_set: ["Gom nhóm phần tử", "Một tập hợp có thể mô tả bằng danh sách phần tử hoặc một tính chất chung.", "Tập A gồm các số tự nhiên nhỏ hơn 4 có thể viết A = {0; 1; 2; 3}.", "Hỏi một đối tượng có thuộc tập hợp hay không trước khi tính toán."],
    nat_notation: ["Tách hàng và lớp", "Giá trị của chữ số phụ thuộc vào vị trí của nó trong số.", "Trong 3 405, chữ số 4 ở hàng trăm nên có giá trị 400.", "Đọc số từ trái sang phải theo lớp triệu, nghìn, đơn vị."],
    nat_order: ["Đặt số lên tia số", "Số ở bên phải lớn hơn số ở bên trái.", "357 < 375 vì cùng hàng trăm, nhưng 5 chục nhỏ hơn 7 chục.", "So sánh lần lượt từ hàng cao nhất."],
    nat_add_sub: ["Tổng và hiệu", "Cộng là gộp thêm, trừ là bớt đi hoặc tìm phần còn thiếu.", "Nếu có 48 quyển vở và mua thêm 27 quyển thì có 75 quyển.", "Dùng phép tính ngược để kiểm tra."],
    nat_mul_div: ["Nhóm đều", "Nhân là cộng các nhóm bằng nhau; chia là tách thành các nhóm đều hoặc tìm số nhóm.", "6 hộp, mỗi hộp 12 bút có 72 bút.", "Khi chia có dư, số dư luôn nhỏ hơn số chia."],
    nat_power: ["Nhân lặp", "Lũy thừa giúp viết gọn nhiều thừa số bằng nhau.", "2^4 = 2 · 2 · 2 · 2 = 16.", "Cơ số là số được nhân lặp, số mũ là số lần nhân."],
    nat_order_ops: ["Thứ tự ưu tiên", "Ngoặc và lũy thừa được xử lí trước cộng trừ.", "3 + 2 · 5 = 13, không phải 25.", "Làm từ trong ngoặc ra ngoài."],
    div_relation: ["Chia hết", "a chia hết cho b khi a = b · q với q là số tự nhiên.", "24 chia hết cho 6 vì 24 = 6 · 4.", "Muốn chứng minh chia hết, hãy tìm thương nguyên."],
    div_signs: ["Dấu hiệu nhanh", "Một số dấu hiệu chia hết dựa vào chữ số tận cùng hoặc tổng chữ số.", "735 chia hết cho 5 vì tận cùng là 5; chia hết cho 3 vì 7+3+5=15.", "Kiểm tra đúng dấu hiệu trước khi chia dài."],
    prime_numbers: ["Khối xây số học", "Số nguyên tố chỉ có hai ước dương là 1 và chính nó.", "29 là số nguyên tố; 1 không phải số nguyên tố.", "Thử chia cho các số nguyên tố nhỏ trước."],
    gcd: ["Phần chia chung lớn nhất", "ƯCLN là ước chung lớn nhất của các số.", "Ư(12) và Ư(18) có ước chung lớn nhất là 6.", "Phân tích thừa số rồi lấy phần chung với số mũ nhỏ nhất."],
    lcm: ["Nhịp gặp lại", "BCNN là bội chung dương nhỏ nhất.", "BCNN(4, 6) = 12 nên hai chu kì 4 và 6 gặp lại sau 12 đơn vị.", "Lấy đủ các thừa số nguyên tố với số mũ lớn nhất."],
    int_set: ["Trục số hai phía", "Số nguyên âm biểu diễn các đại lượng dưới mốc 0.", "Nhiệt độ -3 độ C thấp hơn 0 độ C ba đơn vị.", "Dấu âm cho biết vị trí bên trái 0 trên trục số."],
    int_order: ["Bên phải lớn hơn", "Trên trục số, số nằm bên phải luôn lớn hơn.", "-2 > -5 vì -2 gần 0 hơn.", "Với hai số âm, số có giá trị tuyệt đối nhỏ hơn thì lớn hơn."],
    int_add_sub: ["Di chuyển trên trục số", "Cộng số dương đi sang phải, cộng số âm đi sang trái.", "-3 + 5 = 2 vì từ -3 đi sang phải 5 bước.", "Trừ một số là cộng với số đối của nó."],
    int_mul_div: ["Quy tắc dấu", "Hai số cùng dấu cho kết quả dương, khác dấu cho kết quả âm.", "(-4) · 3 = -12; (-12) : (-3) = 4.", "Xác định dấu trước, tính giá trị tuyệt đối sau."],
    int_divisibility: ["Ước bội với số âm", "Trong số nguyên, ước và bội có thể mang dấu âm.", "-12 chia hết cho 3 vì -12 = 3 · (-4).", "Quan hệ chia hết phụ thuộc vào thương nguyên."],
    shape_regular: ["Hình đều", "Hình đều có các cạnh bằng nhau và các góc bằng nhau.", "Lục giác đều có 6 cạnh bằng nhau.", "Đếm cạnh, góc và kiểm tra tính bằng nhau."],
    shape_quads: ["Tứ giác đặc biệt", "Mỗi tứ giác đặc biệt có dấu hiệu nhận dạng riêng.", "Hình bình hành có hai cặp cạnh đối song song.", "Quan sát cạnh đối, góc vuông và độ dài cạnh."],
    shape_perimeter_area: ["Đo quanh và đo phần mặt", "Chu vi đo đường bao quanh, diện tích đo phần mặt phẳng bên trong.", "Hình chữ nhật dài 8 cm, rộng 5 cm có diện tích 40 cm2.", "Chọn đúng công thức theo đúng loại hình."],
    sym_axis: ["Gấp đôi hình", "Trục đối xứng là đường gấp làm hai nửa chồng khít.", "Hình vuông có 4 trục đối xứng.", "Tưởng tượng gấp hình theo đường đó."],
    sym_center: ["Quay nửa vòng", "Tâm đối xứng giữ hình trùng lại sau khi quay 180 độ.", "Hình bình hành có tâm đối xứng là giao điểm hai đường chéo.", "Ghép mỗi điểm với điểm đối qua tâm."],
    fraction_equal: ["Cùng phần được tô", "Nhân hoặc chia cả tử và mẫu với cùng một số khác 0 tạo phân số bằng nhau.", "1/2 = 2/4 = 4/8.", "Không được chỉ nhân tử hoặc chỉ nhân mẫu."],
    fraction_compare: ["So sánh cùng chuẩn", "Có thể quy đồng mẫu hoặc đặt phân số lên trục số.", "2/3 > 1/2 vì 4/6 > 3/6.", "Đưa hai phân số về cùng mẫu để so sánh tử."],
    fraction_add_sub: ["Quy đồng rồi cộng trừ", "Chỉ cộng trừ tử số khi các mẫu đã bằng nhau.", "1/3 + 1/6 = 2/6 + 1/6 = 1/2.", "Mẫu chung giúp các phần có cùng kích thước."],
    fraction_mul_div: ["Nhân thẳng, chia đảo", "Nhân tử với tử, mẫu với mẫu; chia cho phân số là nhân với nghịch đảo.", "2/3 · 3/5 = 2/5.", "Rút gọn trước hoặc sau để kết quả gọn."],
    fraction_two_problems: ["Phần của số", "Tìm m/n của a bằng a · m/n; biết m/n của số là b thì số đó là b : m/n.", "3/4 của 20 là 15.", "Xác định bài toán hỏi phần của số hay hỏi số ban đầu."],
    decimal_intro: ["Dấu phẩy thập phân", "Số thập phân biểu diễn phần mười, phần trăm, phần nghìn.", "0,75 = 75/100 = 3/4.", "So sánh từng hàng từ trái sang phải."],
    decimal_ops: ["Tính với dấu phẩy", "Cộng trừ đặt thẳng hàng dấu phẩy; nhân chia theo quy tắc số thập phân.", "2,5 + 0,75 = 3,25.", "Ước lượng trước để phát hiện đặt sai dấu phẩy."],
    decimal_round: ["Gần đúng hợp lí", "Làm tròn giúp tính nhanh và dự đoán kết quả.", "3,76 làm tròn đến hàng phần mười là 3,8.", "Nhìn chữ số ngay bên phải hàng cần làm tròn."],
    ratio_percent: ["So sánh bằng tỉ số", "Phần trăm là tỉ số có mẫu 100.", "25% của 80 là 20.", "Đổi phần trăm thành phân số hoặc số thập phân trước khi tính."],
    point_line: ["Điểm và đường", "Điểm có thể thuộc hoặc không thuộc một đường thẳng.", "Nếu A nằm trên đường thẳng d, viết A thuộc d.", "Kí hiệu rõ đối tượng: điểm bằng chữ in hoa, đường thẳng bằng chữ thường."],
    three_points: ["Nằm giữa và tia", "Một điểm nằm giữa hai điểm khi ba điểm thẳng hàng và ở trong đoạn nối hai điểm kia.", "Nếu B nằm giữa A và C thì tia BA và BC là hai tia đối nhau.", "Luôn kiểm tra điều kiện thẳng hàng."],
    segment_length: ["Đoạn và độ dài", "Đoạn thẳng có hai đầu mút và độ dài xác định.", "AB = 5 cm nghĩa là độ dài đoạn thẳng AB là 5 cm.", "Dùng cùng đơn vị trước khi so sánh."],
    midpoint: ["Chia đôi đoạn", "Trung điểm nằm giữa hai đầu mút và cách đều hai đầu mút.", "Nếu M nằm giữa A, B và AM = MB thì M là trung điểm AB.", "Thiếu một trong hai điều kiện thì chưa kết luận được."],
    data_collect: ["Từ quan sát đến bảng", "Dữ liệu cần được thu thập đúng đối tượng và sắp xếp dễ đọc.", "Khảo sát môn thể thao yêu thích rồi lập bảng tần số.", "Ghi rõ tiêu chí phân loại để tránh đếm nhầm."],
    data_chart: ["Nhìn dữ liệu bằng hình", "Biểu đồ giúp so sánh dữ liệu nhanh hơn bảng dài.", "Biểu đồ cột cho thấy lớp nào có nhiều học sinh nhất.", "Đọc tên biểu đồ, trục và đơn vị trước khi kết luận."],
    data_analysis: ["Nhận xét từ số liệu", "So sánh dữ liệu cần dựa vào số lượng, chênh lệch hoặc xu hướng.", "Nếu tháng 5 bán 120 sách, tháng 6 bán 150 sách thì tăng 30 sách.", "Nêu nhận xét kèm con số chứng minh."],
    probability_exp: ["Tần suất xảy ra", "Xác suất thực nghiệm bằng số lần sự kiện xảy ra chia tổng số lần thử.", "Tung đồng xu 20 lần, xuất hiện mặt sấp 9 lần thì xác suất thực nghiệm là 9/20.", "Càng thử nhiều lần, kết quả thường ổn định hơn."]
  };
  const [visualTitle, visualContent, example, summary] = map[id] || [title, `Chủ đề ${chapter} được chia thành một bước nhỏ để luyện hằng ngày.`, "Hãy làm một ví dụ ngắn rồi tự kiểm tra bằng câu hỏi.", "Nắm chắc khái niệm trước khi tăng tốc."];
  return { visualTitle, visualContent, example, summary, numerator: id.includes("fraction") ? 2 : 3, denominator: id.includes("fraction") ? 3 : 4 };
}

const q = {
  nat_set: [["multiple_choice", "Tập A = {1; 3; 5; 7}. Phần tử nào thuộc A?", ["3", "4", "6", "8"], "3", "Kiểm tra số có xuất hiện trong danh sách phần tử không."], ["input", "Viết số phần tử của tập {a; b; c; d}.", "4", "Đếm từng phần tử khác nhau."]],
  nat_notation: [["multiple_choice", "Trong số 5 204, chữ số 2 có giá trị là bao nhiêu?", ["200", "20", "2", "2 000"], "200", "Chữ số 2 ở hàng trăm."], ["input", "Số gồm 3 nghìn, 0 trăm, 4 chục, 7 đơn vị là số nào?", "3047", "Ghép theo thứ tự nghìn, trăm, chục, đơn vị."]],
  nat_order: [["multiple_choice", "Số nào lớn nhất?", ["409", "490", "904", "940"], "940", "So sánh từ hàng trăm rồi đến hàng chục."], ["input", "Điền dấu >, < hoặc =: 356 ___ 365", "<", "Cùng hàng trăm, so sánh hàng chục."]],
  nat_add_sub: [["input", "Tính 438 + 127.", "565", "Cộng từ hàng đơn vị và nhớ nếu cần."], ["multiple_choice", "765 - 240 bằng bao nhiêu?", ["525", "535", "505", "625"], "525", "Trừ từng hàng."]],
  nat_mul_div: [["input", "Tính 24 · 6.", "144", "24 nhân 6 là 20·6 + 4·6."], ["multiple_choice", "37 chia cho 5 có số dư là bao nhiêu?", ["2", "5", "7", "1"], "2", "37 = 5 · 7 + 2."]],
  nat_power: [["multiple_choice", "3^4 có nghĩa là gì?", ["3·3·3·3", "3+4", "4·4·4", "12"], "3·3·3·3", "Số mũ cho biết số lần nhân cơ số."], ["input", "Tính 2^5.", "32", "2 nhân với chính nó 5 lần."]],
  nat_order_ops: [["input", "Tính 6 + 4 · 3.", "18", "Nhân trước, cộng sau."], ["multiple_choice", "(8 + 2)^2 bằng bao nhiêu?", ["100", "68", "20", "12"], "100", "Tính trong ngoặc trước."]],
  div_relation: [["multiple_choice", "Số nào chia hết cho 7?", ["42", "44", "45", "46"], "42", "42 = 7 · 6."], ["input", "Điền số q: 56 = 8 · q.", "7", "Tìm thương nguyên."]],
  div_signs: [["multiple_choice", "Số nào chia hết cho cả 2 và 5?", ["140", "135", "222", "351"], "140", "Chia hết cho 10 thì chia hết cho cả 2 và 5."], ["input", "Tổng chữ số của 729 là bao nhiêu?", "18", "Cộng 7 + 2 + 9."]],
  prime_numbers: [["multiple_choice", "Số nào là số nguyên tố?", ["29", "1", "21", "35"], "29", "Số nguyên tố có đúng hai ước dương."], ["input", "Phân tích 18 thành thừa số nguyên tố dạng 2*3^a. a bằng bao nhiêu?", "2", "18 = 2 · 3 · 3."]],
  gcd: [["input", "ƯCLN(12, 18) bằng bao nhiêu?", "6", "Liệt kê ước chung rồi chọn số lớn nhất."], ["multiple_choice", "Ước chung của 8 và 20 là số nào?", ["4", "6", "10", "12"], "4", "4 chia hết cả 8 và 20."]],
  lcm: [["input", "BCNN(4, 6) bằng bao nhiêu?", "12", "Tìm bội chung dương nhỏ nhất."], ["multiple_choice", "Bội chung của 5 và 8 là số nào?", ["40", "20", "25", "18"], "40", "40 chia hết cho cả 5 và 8."]],
  int_set: [["multiple_choice", "Nhiệt độ thấp hơn 0 độ C ba độ được viết là gì?", ["-3", "3", "0", "1/3"], "-3", "Thấp hơn mốc 0 dùng số âm."], ["input", "Số đối của 7 là gì?", "-7", "Hai số đối nhau nằm hai phía của 0."]],
  int_order: [["multiple_choice", "Số nào lớn hơn?", ["-2", "-5"], "-2", "Trên trục số, -2 nằm bên phải -5."], ["input", "Điền dấu >, < hoặc =: -8 ___ -3", "<", "-8 nằm bên trái -3."]],
  int_add_sub: [["input", "Tính -4 + 9.", "5", "Từ -4 đi sang phải 9 bước."], ["multiple_choice", "7 - 10 bằng bao nhiêu?", ["-3", "3", "17", "-17"], "-3", "Trừ 10 nghĩa là đi sang trái 10 bước."]],
  int_mul_div: [["input", "Tính (-6) · 4.", "-24", "Khác dấu thì kết quả âm."], ["multiple_choice", "(-18) : (-3) bằng bao nhiêu?", ["6", "-6", "15", "-15"], "6", "Cùng dấu thì kết quả dương."]],
  int_divisibility: [["multiple_choice", "-15 chia hết cho số nào?", ["5", "4", "6", "8"], "5", "-15 = 5 · (-3)."], ["input", "Một bội của -4 gần 0 nhất nhưng khác 0 là số âm nào?", "-4", "Bội của -4 có dạng -4 · k."]],
  shape_regular: [["multiple_choice", "Hình nào có 6 cạnh bằng nhau và 6 góc bằng nhau?", ["Lục giác đều", "Tam giác đều", "Hình thoi", "Hình thang"], "Lục giác đều", "Tên hình cho biết số cạnh."], ["input", "Tam giác đều có bao nhiêu cạnh bằng nhau?", "3", "Tam giác có 3 cạnh."]],
  shape_quads: [["multiple_choice", "Hình chữ nhật có đặc điểm nào?", ["Bốn góc vuông", "Chỉ một cặp cạnh song song", "Ba cạnh bằng nhau", "Không có góc vuông"], "Bốn góc vuông", "Hình chữ nhật có 4 góc vuông."], ["input", "Hình bình hành có mấy cặp cạnh đối song song?", "2", "Hai cặp cạnh đối song song."]],
  shape_perimeter_area: [["input", "Chu vi hình vuông cạnh 6 cm là bao nhiêu cm?", "24", "Chu vi hình vuông bằng 4 lần cạnh."], ["multiple_choice", "Diện tích hình chữ nhật dài 8 cm, rộng 5 cm là bao nhiêu?", ["40 cm2", "26 cm2", "13 cm2", "80 cm2"], "40 cm2", "Diện tích bằng dài nhân rộng."]],
  sym_axis: [["multiple_choice", "Hình nào có trục đối xứng?", ["Hình vuông", "Tam giác thường", "Hình bình hành thường", "Mũi tên lệch"], "Hình vuông", "Gấp theo đường giữa, hai nửa hình vuông chồng khít."], ["input", "Hình chữ nhật có bao nhiêu trục đối xứng?", "2", "Có trục ngang và trục dọc đi qua tâm."]],
  sym_center: [["multiple_choice", "Tâm đối xứng của hình bình hành là gì?", ["Giao điểm hai đường chéo", "Một đỉnh bất kì", "Trung điểm một cạnh", "Bên ngoài hình"], "Giao điểm hai đường chéo", "Quay nửa vòng quanh điểm đó hình trùng lại."], ["input", "Quay 180 độ còn gọi là quay nửa vòng. Điền số độ: ___", "180", "Một vòng là 360 độ."]],
  fraction_equal: [["multiple_choice", "Phân số nào bằng 1/2?", ["2/4", "2/3", "3/5", "4/6"], "2/4", "Nhân cả tử và mẫu của 1/2 với 2."], ["input", "Rút gọn 6/9.", "2/3", "Chia cả tử và mẫu cho 3."]],
  fraction_compare: [["multiple_choice", "Phân số nào lớn hơn?", ["2/3", "1/2"], "2/3", "Quy đồng: 4/6 > 3/6."], ["input", "Điền dấu >, < hoặc =: 3/5 ___ 4/5", "<", "Cùng mẫu 5, so sánh tử."]],
  fraction_add_sub: [["input", "Tính 1/4 + 2/4.", "3/4", "Cùng mẫu thì cộng tử số."], ["multiple_choice", "1/2 + 1/3 bằng bao nhiêu?", ["5/6", "2/5", "1/5", "2/6"], "5/6", "Quy đồng mẫu 6."]],
  fraction_mul_div: [["input", "Tính 2/3 * 3/4 rồi rút gọn.", "1/2", "Nhân tử với tử, mẫu với mẫu rồi rút gọn."], ["multiple_choice", "1/2 : 1/4 bằng bao nhiêu?", ["2", "1/8", "1/2", "4"], "2", "Chia cho 1/4 là nhân với 4."]],
  fraction_two_problems: [["input", "3/4 của 20 là bao nhiêu?", "15", "Tính 20 · 3/4."], ["multiple_choice", "Biết 1/3 của một số là 9. Số đó là?", ["27", "3", "12", "18"], "27", "Số cần tìm bằng 9 : 1/3."]],
  decimal_intro: [["multiple_choice", "0,75 bằng phân số nào?", ["75/100", "75/10", "7/5", "3/10"], "75/100", "Hai chữ số sau dấu phẩy là phần trăm."], ["input", "Viết 3/10 dưới dạng số thập phân dùng dấu phẩy.", "0,3", "3 phần mười là 0,3."]],
  decimal_ops: [["input", "Tính 2,5 + 0,75.", "3,25", "Đặt thẳng hàng dấu phẩy."], ["multiple_choice", "1,2 · 3 bằng bao nhiêu?", ["3,6", "36", "0,36", "4,2"], "3,6", "12 phần mười nhân 3 là 36 phần mười."]],
  decimal_round: [["input", "Làm tròn 3,76 đến hàng phần mười.", "3,8", "Nhìn chữ số hàng phần trăm là 6 nên tăng."], ["multiple_choice", "Ước lượng 49,8 + 20,1 gần bằng bao nhiêu?", ["70", "60", "80", "50"], "70", "49,8 gần 50; 20,1 gần 20."]],
  ratio_percent: [["input", "25% của 80 là bao nhiêu?", "20", "25% = 1/4."], ["multiple_choice", "Tỉ số của 3 và 12 là gì?", ["1/4", "4", "9", "12/3"], "1/4", "3/12 rút gọn bằng 1/4."]],
  point_line: [["multiple_choice", "Kí hiệu nào thường dùng cho điểm?", ["A", "d", "m", "xy"], "A", "Điểm thường kí hiệu bằng chữ in hoa."], ["input", "Có bao nhiêu đường thẳng đi qua hai điểm phân biệt?", "1", "Qua hai điểm phân biệt chỉ có một đường thẳng."]],
  three_points: [["multiple_choice", "Nếu B nằm giữa A và C thì ba điểm A, B, C phải như thế nào?", ["Thẳng hàng", "Tạo tam giác", "Trùng nhau", "Không thẳng hàng"], "Thẳng hàng", "Điểm nằm giữa chỉ xét khi thẳng hàng."], ["input", "Hai tia đối nhau có chung mấy gốc?", "1", "Hai tia đối nhau chung gốc và tạo thành đường thẳng."]],
  segment_length: [["input", "Đoạn AB dài 7 cm, đoạn BC dài 5 cm. Nếu B nằm giữa A và C thì AC dài bao nhiêu cm?", "12", "Cộng hai đoạn liên tiếp."], ["multiple_choice", "Đoạn thẳng có bao nhiêu đầu mút?", ["2", "1", "0", "3"], "2", "Đoạn thẳng được giới hạn bởi hai điểm."]],
  midpoint: [["multiple_choice", "M là trung điểm AB khi nào?", ["M nằm giữa A, B và MA = MB", "MA > MB", "M không thuộc AB", "A nằm giữa M và B"], "M nằm giữa A, B và MA = MB", "Cần đủ hai điều kiện."], ["input", "AB = 10 cm, M là trung điểm AB. AM bằng bao nhiêu cm?", "5", "Trung điểm chia đoạn thành hai phần bằng nhau."]],
  data_collect: [["multiple_choice", "Bảng dữ liệu dùng để làm gì?", ["Tổ chức thông tin", "Vẽ đường thẳng", "Tính lũy thừa", "Đo góc"], "Tổ chức thông tin", "Dữ liệu cần được sắp xếp để đọc dễ hơn."], ["input", "Có 5 bạn chọn bóng đá, 3 bạn chọn cầu lông. Tổng số bạn được hỏi là bao nhiêu?", "8", "Cộng số bạn ở hai nhóm."]],
  data_chart: [["multiple_choice", "Biểu đồ cột phù hợp nhất để làm gì?", ["So sánh số lượng giữa các nhóm", "Tính ƯCLN", "Đo đoạn thẳng", "Rút gọn phân số"], "So sánh số lượng giữa các nhóm", "Chiều cao cột biểu diễn số lượng."], ["input", "Một cột cao đến vạch 12 học sinh. Giá trị của cột là bao nhiêu?", "12", "Đọc theo trục số lượng."]],
  data_analysis: [["input", "Tháng 5 bán 120 quyển, tháng 6 bán 150 quyển. Tăng bao nhiêu quyển?", "30", "Lấy 150 - 120."], ["multiple_choice", "Nhận xét nào cần có bằng chứng?", ["Tháng 6 bán nhiều hơn tháng 5 30 quyển", "Dữ liệu không cần đọc", "Cột cao hơn thì ít hơn", "Không cần đơn vị"], "Tháng 6 bán nhiều hơn tháng 5 30 quyển", "Nhận xét tốt kèm số liệu."]],
  probability_exp: [["input", "Tung xu 20 lần, mặt sấp xuất hiện 9 lần. Xác suất thực nghiệm của mặt sấp là gì?", "9/20", "Số lần xảy ra chia tổng số lần thử."], ["multiple_choice", "Gieo xúc xắc 30 lần, ra số 6 được 5 lần. Xác suất thực nghiệm là?", ["5/30", "6/30", "30/5", "1/30"], "5/30", "Lấy số lần ra 6 chia tổng số lần gieo."]]
};

function questionObjects(item) {
  const [id] = item;
  return q[id].map((entry, index) => {
    const [type, question, choicesOrAnswer, answerOrHint, maybeHint] = entry;
    const isChoice = type === "multiple_choice";
    return {
      id: `q_${id}_${index + 1}`,
      skill: id,
      type,
      question,
      ...(isChoice ? { choices: choicesOrAnswer, answer: answerOrHint, hint: maybeHint } : { answer: choicesOrAnswer, hint: answerOrHint })
    };
  });
}

const commonErrors = [
  ["nat_order_ops", "25", "order_error", "Sai thứ tự phép tính", "Bạn đang cộng trước khi nhân.", "Hãy thực hiện nhân chia trước cộng trừ nếu không có ngoặc."],
  ["div_signs", "135", "divisibility_error", "Nhầm dấu hiệu chia hết", "Số tận cùng 5 chia hết cho 5 nhưng không nhất thiết chia hết cho 2.", "Kiểm tra từng dấu hiệu riêng."],
  ["prime_numbers", "1", "prime_error", "Nhầm số 1 là số nguyên tố", "Số 1 chỉ có một ước dương nên không phải số nguyên tố.", "Số nguyên tố cần đúng hai ước dương."],
  ["int_order", ">", "sign_error", "So sánh số âm ngược chiều", "Với số âm, số xa 0 hơn lại nhỏ hơn.", "Đặt hai số lên trục số."],
  ["int_mul_div", "24", "sign_error", "Sai dấu khi nhân chia số nguyên", "Hai số khác dấu cho kết quả âm.", "Xác định dấu trước khi tính độ lớn."],
  ["shape_perimeter_area", "13", "formula_error", "Nhầm chu vi và diện tích", "Bạn đang cộng hai kích thước thay vì nhân để tính diện tích.", "Diện tích hình chữ nhật bằng dài nhân rộng."],
  ["fraction_equal", "3/9", "fraction_reduce_error", "Rút gọn chưa hết", "Bạn mới chia tử hoặc mẫu chưa đúng cách.", "Chia cả tử và mẫu cho cùng một ước chung."],
  ["fraction_add_sub", "2/7", "denominator_error", "Cộng cả mẫu số", "Khi cộng phân số, không cộng hai mẫu số với nhau.", "Quy đồng mẫu rồi cộng tử số."],
  ["fraction_mul_div", "2/12", "fraction_reduce_error", "Chưa rút gọn kết quả", "Kết quả đúng về phép nhân nhưng chưa tối giản.", "Tìm ước chung để rút gọn."],
  ["decimal_ops", "36", "decimal_point_error", "Quên dấu phẩy thập phân", "Bạn tính đúng phần số nhưng đặt sai dấu phẩy.", "Ước lượng để thấy 1,2 · 3 phải gần 3,6."],
  ["ratio_percent", "25", "percent_error", "Nhầm phần trăm với số tự nhiên", "25% không phải là 25 lần mà là 25/100.", "Đổi phần trăm về phân số hoặc số thập phân."],
  ["midpoint", "10", "midpoint_error", "Chưa chia đôi đoạn thẳng", "Trung điểm chia đoạn thành hai đoạn bằng nhau.", "Lấy độ dài cả đoạn chia 2."],
  ["probability_exp", "9", "probability_error", "Thiếu tổng số lần thử", "Xác suất thực nghiệm là một tỉ số, không chỉ là số lần xảy ra.", "Viết số lần xảy ra trên tổng số lần thử."]
];

const skills = lessons.map(skillFromLesson);
const lessonData = lessons.map((item) => ({
  id: item[0],
  title: item[1],
  skill: item[0],
  chapter: item[2],
  source: "Bám mạch SGK Toán 6 - Kết nối tri thức với cuộc sống, nội dung và câu hỏi tự biên soạn.",
  xp: 50 + Math.min(30, Math.floor(lessons.findIndex((x) => x[0] === item[0]) / 10) * 10),
  steps: lessonSteps(item)
}));

const questions = lessons.flatMap(questionObjects);
const errors = commonErrors.map(([skill, pattern, errorType, title, message, hint]) => ({
  pattern,
  skill,
  errorType,
  title,
  message,
  hint,
  recommendation: skill
}));

await writeFile("data/skills.json", `${JSON.stringify(skills, null, 2)}\n`);
await writeFile("data/lessons.json", `${JSON.stringify(lessonData, null, 2)}\n`);
await writeFile("data/questions.json", `${JSON.stringify(questions, null, 2)}\n`);
await writeFile("data/errors.json", `${JSON.stringify(errors, null, 2)}\n`);

console.log(`Generated ${skills.length} skills, ${lessonData.length} lessons, ${questions.length} questions, ${errors.length} error patterns.`);
