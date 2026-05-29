import { readFile, writeFile } from "node:fs/promises";

const paths = {
  skills: "data/skills.json",
  lessons: "data/lessons.json",
  questions: "data/questions.json",
  errors: "data/errors.json"
};

const grade8 = [
  ["g8_monomial", "Bài 1. Đơn thức", "Đa thức", "Nhận biết đơn thức, đơn thức thu gọn, hệ số, phần biến và đơn thức đồng dạng.", "algebra"],
  ["g8_polynomial", "Bài 2. Đa thức", "Đa thức", "Nhận biết đa thức, hạng tử, đa thức thu gọn và bậc của đa thức.", "algebra"],
  ["g8_poly_add_sub", "Bài 3. Phép cộng và phép trừ đa thức", "Đa thức", "Cộng, trừ đa thức bằng cách nhóm các hạng tử đồng dạng.", "algebra"],
  ["g8_poly_multiply", "Bài 4. Phép nhân đa thức", "Đa thức", "Nhân đơn thức với đa thức và nhân đa thức với đa thức bằng phân phối.", "algebra"],
  ["g8_poly_div_monomial", "Bài 5. Phép chia đa thức cho đơn thức", "Đa thức", "Chia từng hạng tử của đa thức cho đơn thức khi phép chia thực hiện được.", "algebra"],

  ["g8_identity_square", "Bài 6. Hiệu hai bình phương. Bình phương của một tổng hay một hiệu", "Hằng đẳng thức đáng nhớ và ứng dụng", "Nhận biết và vận dụng a^2-b^2, (a+b)^2, (a-b)^2.", "algebra"],
  ["g8_identity_cube", "Bài 7. Lập phương của một tổng. Lập phương của một hiệu", "Hằng đẳng thức đáng nhớ và ứng dụng", "Khai triển và rút gọn biểu thức bằng hằng đẳng thức lập phương.", "algebra"],
  ["g8_identity_sum_diff_cubes", "Bài 8. Tổng và hiệu hai lập phương", "Hằng đẳng thức đáng nhớ và ứng dụng", "Vận dụng a^3+b^3 và a^3-b^3 để phân tích hoặc tính nhanh.", "algebra"],
  ["g8_factorization", "Bài 9. Phân tích đa thức thành nhân tử", "Hằng đẳng thức đáng nhớ và ứng dụng", "Phân tích đa thức bằng đặt nhân tử chung, hằng đẳng thức và nhóm hạng tử.", "algebra"],

  ["g8_quadrilateral", "Bài 10. Tứ giác", "Tứ giác", "Nhận biết tứ giác, tổng các góc trong tứ giác và các yếu tố cơ bản.", "geometry"],
  ["g8_isosceles_trapezoid", "Bài 11. Hình thang cân", "Tứ giác", "Nhận biết tính chất cạnh, góc và đường chéo của hình thang cân.", "geometry"],
  ["g8_parallelogram", "Bài 12. Hình bình hành", "Tứ giác", "Nhận biết và vận dụng tính chất, dấu hiệu hình bình hành.", "geometry"],
  ["g8_rectangle", "Bài 13. Hình chữ nhật", "Tứ giác", "Nhận biết tính chất và dấu hiệu hình chữ nhật.", "geometry"],
  ["g8_rhombus_square", "Bài 14. Hình thoi và hình vuông", "Tứ giác", "Nhận biết tính chất, dấu hiệu hình thoi và hình vuông.", "geometry"],

  ["g8_thales", "Bài 15. Định lí Thalès trong tam giác", "Định lí Thalès", "Vận dụng định lí Thalès và định lí đảo để tính tỉ số đoạn thẳng.", "ratio"],
  ["g8_midline_triangle", "Bài 16. Đường trung bình của tam giác", "Định lí Thalès", "Nhận biết đường trung bình của tam giác và tính độ dài đoạn song song.", "triangle"],
  ["g8_angle_bisector", "Bài 17. Tính chất đường phân giác của tam giác", "Định lí Thalès", "Vận dụng tỉ số hai cạnh kề theo đường phân giác trong tam giác.", "triangle"],

  ["g8_data_collect", "Bài 18. Thu thập và phân loại dữ liệu", "Dữ liệu và biểu đồ", "Thu thập dữ liệu phù hợp, phân loại dữ liệu định tính và định lượng.", "data"],
  ["g8_data_display", "Bài 19. Biểu diễn dữ liệu bằng bảng, biểu đồ", "Dữ liệu và biểu đồ", "Chọn bảng, biểu đồ cột, quạt tròn hoặc đoạn thẳng phù hợp để biểu diễn dữ liệu.", "chart"],
  ["g8_data_analysis_chart", "Bài 20. Phân tích số liệu thống kê dựa vào biểu đồ", "Dữ liệu và biểu đồ", "Đọc biểu đồ, so sánh, nhận xét xu hướng và rút kết luận từ số liệu.", "chart"],

  ["g8_rational_expr", "Bài 21. Phân thức đại số", "Phân thức đại số", "Nhận biết phân thức đại số, điều kiện xác định và giá trị của phân thức.", "algebra"],
  ["g8_rational_expr_property", "Bài 22. Tính chất cơ bản của phân thức đại số", "Phân thức đại số", "Rút gọn và biến đổi phân thức bằng nhân, chia tử mẫu với cùng một nhân tử khác 0.", "algebra"],
  ["g8_rational_expr_add_sub", "Bài 23. Phép cộng và phép trừ phân thức đại số", "Phân thức đại số", "Cộng, trừ phân thức cùng mẫu hoặc khác mẫu bằng quy đồng.", "algebra"],
  ["g8_rational_expr_mul_div", "Bài 24. Phép nhân và phép chia phân thức đại số", "Phân thức đại số", "Nhân, chia phân thức và rút gọn kết quả.", "algebra"],

  ["g8_linear_equation", "Bài 25. Phương trình bậc nhất một ẩn", "Phương trình bậc nhất và hàm số bậc nhất", "Giải phương trình dạng ax+b=0 với a khác 0.", "equationBalance"],
  ["g8_word_equation", "Bài 26. Giải bài toán bằng cách lập phương trình", "Phương trình bậc nhất và hàm số bậc nhất", "Chọn ẩn, lập phương trình và giải bài toán thực tế đơn giản.", "equationBalance"],
  ["g8_function_graph_intro", "Bài 27. Khái niệm hàm số và đồ thị của hàm số", "Phương trình bậc nhất và hàm số bậc nhất", "Nhận biết hàm số, giá trị của hàm số và điểm thuộc đồ thị.", "graph"],
  ["g8_linear_function", "Bài 28. Hàm số bậc nhất và đồ thị của hàm số bậc nhất", "Phương trình bậc nhất và hàm số bậc nhất", "Vẽ và đọc đồ thị hàm số y=ax+b với a khác 0.", "graph"],
  ["g8_slope", "Bài 29. Hệ số góc của đường thẳng", "Phương trình bậc nhất và hàm số bậc nhất", "Hiểu hệ số góc a trong y=ax+b và so sánh độ dốc của đường thẳng.", "graph"],

  ["g8_outcomes", "Bài 30. Kết quả có thể và kết quả thuận lợi", "Mở đầu về tính xác suất của biến cố", "Xác định không gian mẫu và các kết quả thuận lợi cho một biến cố.", "probability"],
  ["g8_probability_ratio", "Bài 31. Cách tính xác suất của biến cố bằng tỉ số", "Mở đầu về tính xác suất của biến cố", "Tính xác suất bằng tỉ số số kết quả thuận lợi trên số kết quả có thể.", "probability"],
  ["g8_experimental_probability", "Bài 32. Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng", "Mở đầu về tính xác suất của biến cố", "So sánh xác suất thực nghiệm với xác suất lí thuyết trong tình huống đơn giản.", "probability"],

  ["g8_similar_triangles", "Bài 33. Hai tam giác đồng dạng", "Tam giác đồng dạng", "Nhận biết hai tam giác đồng dạng và tỉ số đồng dạng.", "triangle"],
  ["g8_similarity_cases", "Bài 34. Ba trường hợp đồng dạng của hai tam giác", "Tam giác đồng dạng", "Vận dụng các trường hợp cạnh-cạnh-cạnh, cạnh-góc-cạnh, góc-góc để chứng minh đồng dạng.", "triangle"],
  ["g8_pythagore", "Bài 35. Định lí Pythagore và ứng dụng", "Tam giác đồng dạng", "Vận dụng định lí Pythagore để tính cạnh trong tam giác vuông.", "triangle"],
  ["g8_right_triangle_similarity", "Bài 36. Các trường hợp đồng dạng của hai tam giác vuông", "Tam giác đồng dạng", "Nhận biết các trường hợp đồng dạng đặc biệt của tam giác vuông.", "triangle"],
  ["g8_similar_figures", "Bài 37. Hình đồng dạng", "Tam giác đồng dạng", "Nhận biết hình đồng dạng và tỉ số giữa các kích thước tương ứng.", "geometry"],

  ["g8_triangular_pyramid", "Bài 38. Hình chóp tam giác đều", "Một số hình khối trong thực tiễn", "Nhận biết hình chóp tam giác đều và tính diện tích xung quanh, thể tích đơn giản.", "solid"],
  ["g8_square_pyramid", "Bài 39. Hình chóp tứ giác đều", "Một số hình khối trong thực tiễn", "Nhận biết hình chóp tứ giác đều và vận dụng công thức diện tích, thể tích.", "solid"]
];

const core = {
  g8_monomial: ["Đơn thức thu gọn", "Một đơn thức chỉ gồm số, biến và phép nhân các biến.", "3x^2y và -5xy^2 là hai đơn thức; 3x^2y có hệ số 3.", "Đơn thức đồng dạng có cùng phần biến."],
  g8_polynomial: ["Tổng các đơn thức", "Đa thức là tổng của các đơn thức; mỗi đơn thức là một hạng tử.", "2x^2-3x+1 có ba hạng tử và bậc 2.", "Thu gọn đa thức bằng cách gộp hạng tử đồng dạng."],
  g8_poly_add_sub: ["Gộp đúng hạng tử", "Cộng trừ đa thức là cộng trừ hệ số của các hạng tử đồng dạng.", "(2x+3)+(5x-1)=7x+2.", "Sắp xếp theo bậc để nhìn rõ hạng tử đồng dạng."],
  g8_poly_multiply: ["Phân phối đầy đủ", "Nhân đa thức bằng cách nhân từng hạng tử của đa thức này với từng hạng tử của đa thức kia.", "(x+2)(x+3)=x^2+5x+6.", "Đừng bỏ sót tích chéo."],
  g8_poly_div_monomial: ["Chia từng hạng tử", "Khi chia đa thức cho đơn thức, chia từng hạng tử cho đơn thức đó.", "(6x^2+3x):3x=2x+1.", "Mỗi hạng tử đều phải chia được."],
  g8_identity_square: ["Ba hằng đẳng thức đầu", "(a+b)^2, (a-b)^2 và a^2-b^2 giúp tính nhanh, phân tích nhanh.", "99^2=(100-1)^2=9801.", "Chú ý hạng tử 2ab trong bình phương tổng/hiệu."],
  g8_identity_cube: ["Lập phương tổng hiệu", "(a+b)^3 và (a-b)^3 có các hệ số 1, 3, 3, 1.", "(x+2)^3=x^3+6x^2+12x+8.", "Dấu của lập phương hiệu xen kẽ."],
  g8_identity_sum_diff_cubes: ["Tổng hiệu lập phương", "a^3+b^3=(a+b)(a^2-ab+b^2), a^3-b^3=(a-b)(a^2+ab+b^2).", "x^3-8=(x-2)(x^2+2x+4).", "Nhớ dấu ở tam thức phía sau."],
  g8_factorization: ["Tách thành tích", "Phân tích nhân tử biến tổng thành tích để rút gọn hoặc giải bài toán.", "x^2-9=(x-3)(x+3).", "Ưu tiên đặt nhân tử chung trước."],
  g8_quadrilateral: ["Tổng góc tứ giác", "Tổng bốn góc trong một tứ giác bằng 360 độ.", "Ba góc 80, 90, 100 độ thì góc còn lại 90 độ.", "Chia tứ giác thành hai tam giác để nhớ 360 độ."],
  g8_isosceles_trapezoid: ["Hình thang cân", "Hình thang cân có hai cạnh bên bằng nhau, hai góc kề một đáy bằng nhau.", "Hai đường chéo hình thang cân bằng nhau.", "Kiểm tra trước một cặp cạnh đối song song."],
  g8_parallelogram: ["Hai cặp cạnh song song", "Hình bình hành có các cạnh đối song song và bằng nhau.", "Đường chéo hình bình hành cắt nhau tại trung điểm mỗi đường.", "Một dấu hiệu đủ là hai cặp cạnh đối song song."],
  g8_rectangle: ["Hình bình hành có góc vuông", "Hình chữ nhật là tứ giác có bốn góc vuông.", "Đường chéo hình chữ nhật bằng nhau.", "Hình bình hành có một góc vuông là hình chữ nhật."],
  g8_rhombus_square: ["Hình thoi và hình vuông", "Hình thoi có bốn cạnh bằng nhau; hình vuông vừa là hình chữ nhật vừa là hình thoi.", "Đường chéo hình thoi vuông góc với nhau.", "Hình vuông có mọi tính chất của hình chữ nhật và hình thoi."],
  g8_thales: ["Tỉ số đoạn thẳng", "Đường thẳng song song một cạnh tam giác tạo các đoạn tương ứng tỉ lệ.", "Nếu DE song song BC trong tam giác ABC thì AD/AB = AE/AC.", "Nhận ra cặp đường song song trước khi lập tỉ số."],
  g8_midline_triangle: ["Đường trung bình", "Đường trung bình nối trung điểm hai cạnh tam giác, song song cạnh thứ ba và bằng nửa cạnh đó.", "Nếu MN là đường trung bình, MN = BC/2.", "Cần đủ hai trung điểm."],
  g8_angle_bisector: ["Phân giác và tỉ số", "Đường phân giác trong tam giác chia cạnh đối diện theo tỉ số hai cạnh kề.", "AD là phân giác góc A thì BD/DC = AB/AC.", "Đặt đúng cạnh kề với từng đoạn."],
  g8_data_collect: ["Dữ liệu phù hợp", "Dữ liệu cần đúng câu hỏi khảo sát và phân loại rõ ràng.", "Sở thích là dữ liệu định tính, cân nặng là định lượng.", "Chọn mẫu khảo sát phù hợp mục tiêu."],
  g8_data_display: ["Chọn biểu đồ", "Bảng và biểu đồ giúp nhìn dữ liệu theo nhóm, cơ cấu hoặc thời gian.", "Dữ liệu theo tháng thường hợp với biểu đồ đoạn thẳng.", "Chọn biểu đồ theo loại câu hỏi cần trả lời."],
  g8_data_analysis_chart: ["Đọc và nhận xét", "Phân tích biểu đồ cần đọc trục, đơn vị, mức chênh lệch và xu hướng.", "Từ 45 lên 60 là tăng 15 đơn vị.", "Nhận xét nên kèm số liệu."],
  g8_rational_expr: ["Phân thức đại số", "Phân thức có dạng A/B với A, B là đa thức và B khác 0.", "1/(x-2) xác định khi x khác 2.", "Luôn kiểm tra mẫu khác 0."],
  g8_rational_expr_property: ["Biến đổi tương đương", "Nhân hoặc chia cả tử và mẫu với cùng một nhân tử khác 0 không đổi giá trị phân thức.", "2x/4x rút gọn thành 1/2 với x khác 0.", "Rút gọn bằng nhân tử chung, không xóa hạng tử tùy ý."],
  g8_rational_expr_add_sub: ["Quy đồng mẫu", "Cộng trừ phân thức cần cùng mẫu hoặc quy đồng mẫu.", "1/x + 1/2x = 3/2x.", "Không cộng trực tiếp hai mẫu."],
  g8_rational_expr_mul_div: ["Nhân thẳng, chia đảo", "Nhân tử với tử, mẫu với mẫu; chia cho phân thức là nhân với nghịch đảo.", "(x/2):(x/4)=2 với x khác 0.", "Rút gọn nhân tử chung trước hoặc sau."],
  g8_linear_equation: ["Đưa về ax+b=0", "Phương trình bậc nhất một ẩn giải bằng biến đổi tương đương.", "3x-6=0 nên x=2.", "Chuyển vế đổi dấu hoặc chia hai vế cho cùng số khác 0."],
  g8_word_equation: ["Từ lời văn đến phương trình", "Chọn ẩn cho đại lượng chưa biết rồi diễn đạt điều kiện bằng phương trình.", "Một số hơn 5 bằng 12: x+5=12.", "Kiểm tra nghiệm có phù hợp thực tế không."],
  g8_function_graph_intro: ["Mỗi x một y", "Hàm số gán mỗi giá trị x với đúng một giá trị y.", "Với y=2x+1, x=3 thì y=7.", "Điểm (x;y) thuộc đồ thị nếu y đúng bằng giá trị hàm tại x."],
  g8_linear_function: ["Đường thẳng y=ax+b", "Đồ thị hàm bậc nhất là một đường thẳng.", "y=2x+1 đi qua (0;1) và (1;3).", "Chỉ cần hai điểm phân biệt để vẽ đường thẳng."],
  g8_slope: ["Độ dốc đường thẳng", "Trong y=ax+b, a là hệ số góc; a càng lớn thì đường càng dốc lên.", "y=3x+1 dốc hơn y=x+1.", "Nếu a âm, đường thẳng đi xuống khi nhìn từ trái sang phải."],
  g8_outcomes: ["Kết quả thuận lợi", "Kết quả thuận lợi là các kết quả làm biến cố xảy ra.", "Gieo xúc xắc ra số chẵn có kết quả thuận lợi 2,4,6.", "Liệt kê không gian mẫu trước."],
  g8_probability_ratio: ["Tỉ số xác suất", "Khi các kết quả đồng khả năng, xác suất bằng số thuận lợi chia tổng số kết quả.", "P(ra số chẵn)=3/6=1/2.", "Rút gọn tỉ số nếu có thể."],
  g8_experimental_probability: ["Thực nghiệm và lí thuyết", "Xác suất thực nghiệm gần xác suất lí thuyết hơn khi số lần thử lớn.", "Tung xu 100 lần, mặt sấp 48 lần thì tần suất 48/100.", "Không kết luận vội từ quá ít lần thử."],
  g8_similar_triangles: ["Cùng hình, khác cỡ", "Hai tam giác đồng dạng có các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.", "Tam giác phóng to gấp 2 lần đồng dạng với tam giác ban đầu.", "Tỉ số đồng dạng áp dụng cho mọi cạnh tương ứng."],
  g8_similarity_cases: ["Ba trường hợp đồng dạng", "Có thể chứng minh đồng dạng bằng g.g, c.g.c hoặc c.c.c theo tỉ lệ.", "Hai góc tương ứng bằng nhau đủ để kết luận hai tam giác đồng dạng.", "Ghép đúng đỉnh tương ứng."],
  g8_pythagore: ["Tam giác vuông", "Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.", "Tam giác vuông có hai cạnh góc vuông 3 và 4 thì cạnh huyền 5.", "Chỉ áp dụng trực tiếp cho tam giác vuông."],
  g8_right_triangle_similarity: ["Đồng dạng tam giác vuông", "Hai tam giác vuông có thêm một góc nhọn bằng nhau thì đồng dạng.", "Hai tam giác vuông cùng có góc nhọn 35 độ thì đồng dạng.", "Một góc vuông đã bằng nhau sẵn."],
  g8_similar_figures: ["Hình đồng dạng", "Hai hình đồng dạng có cùng hình dạng, kích thước tương ứng tỉ lệ.", "Bản đồ và thực tế là hai hình đồng dạng theo tỉ lệ.", "Tỉ lệ dài, rộng, cao tương ứng phải nhất quán."],
  g8_triangular_pyramid: ["Chóp tam giác đều", "Hình chóp tam giác đều có đáy là tam giác đều và các cạnh bên bằng nhau.", "Diện tích xung quanh bằng tổng diện tích ba mặt bên.", "Xác định đáy và chiều cao trước khi tính."],
  g8_square_pyramid: ["Chóp tứ giác đều", "Hình chóp tứ giác đều có đáy là hình vuông và các mặt bên là tam giác cân bằng nhau.", "Thể tích chóp bằng 1/3 diện tích đáy nhân chiều cao.", "Đơn vị thể tích là đơn vị khối."]
};

const q = {
  g8_monomial: [["multiple_choice", "Đơn thức nào đồng dạng với 3x^2y?", ["-5x^2y", "3xy^2", "x^3", "3x^2"], "-5x^2y", "Đồng dạng nghĩa là cùng phần biến."], ["input", "Hệ số của đơn thức -7x^3y là bao nhiêu?", "-7", "Hệ số là phần số đứng trước phần biến."]],
  g8_polynomial: [["input", "Bậc của đa thức 2x^3 - x + 5 là bao nhiêu?", "3", "Bậc là số mũ lớn nhất."], ["multiple_choice", "Đa thức 4x^2+3x-1 có mấy hạng tử?", ["3", "2", "1", "4"], "3", "Mỗi phần được nối bằng dấu cộng/trừ là một hạng tử."]],
  g8_poly_add_sub: [["input", "Thu gọn: 2x + 5x - 3.", "7x-3", "Gộp 2x và 5x."], ["multiple_choice", "(x^2+2x) - (3x^2-x) bằng?", ["-2x^2+3x", "4x^2+x", "-2x^2+x", "2x^2+3x"], "-2x^2+3x", "Đổi dấu đa thức sau dấu trừ."]],
  g8_poly_multiply: [["input", "Khai triển (x+2)(x+3).", "x^2+5x+6", "Nhân từng hạng tử rồi thu gọn."], ["multiple_choice", "x(2x-5) bằng?", ["2x^2-5x", "2x-5", "2x^2-5", "3x-5"], "2x^2-5x", "x nhân với cả 2x và -5."]],
  g8_poly_div_monomial: [["input", "(6x^2+3x):3x bằng gì?", "2x+1", "Chia từng hạng tử cho 3x."], ["multiple_choice", "10x^3 : 5x bằng?", ["2x^2", "2x^3", "5x^2", "15x"], "2x^2", "Chia hệ số và trừ số mũ của x."]],
  g8_identity_square: [["multiple_choice", "x^2 - 9 phân tích thành gì?", ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)^2", "x(x-9)"], "(x-3)(x+3)", "Đây là hiệu hai bình phương."], ["input", "Khai triển (x+2)^2.", "x^2+4x+4", "Dùng a^2+2ab+b^2."]],
  g8_identity_cube: [["input", "Hệ số của x^2 trong (x+2)^3 là bao nhiêu?", "6", "(x+2)^3=x^3+6x^2+12x+8."], ["multiple_choice", "(a-b)^3 có hạng tử thứ hai là gì?", ["-3a^2b", "3a^2b", "-ab^2", "b^3"], "-3a^2b", "Dấu xen kẽ trong lập phương hiệu."]],
  g8_identity_sum_diff_cubes: [["multiple_choice", "x^3 - 8 bằng?", ["(x-2)(x^2+2x+4)", "(x-2)(x^2-2x+4)", "(x+2)(x^2-2x+4)", "(x-2)^3"], "(x-2)(x^2+2x+4)", "Dùng hiệu hai lập phương."], ["input", "8 + 27 bằng a^3 + b^3 với a=2, b bằng bao nhiêu?", "3", "27=3^3."]],
  g8_factorization: [["input", "Phân tích x^2 - 16 thành nhân tử.", "(x-4)(x+4)", "Hiệu hai bình phương."], ["multiple_choice", "Nhân tử chung của 6x^2 và 9x là gì?", ["3x", "6x", "9x", "x^2"], "3x", "Ước chung lớn nhất của hệ số là 3, phần biến chung là x."]],
  g8_quadrilateral: [["input", "Tổng các góc trong một tứ giác bằng bao nhiêu độ?", "360", "Tứ giác chia được thành hai tam giác."], ["multiple_choice", "Ba góc tứ giác là 80, 90, 100 độ. Góc còn lại là?", ["90", "100", "80", "110"], "90", "360 - 80 - 90 - 100."]],
  g8_isosceles_trapezoid: [["multiple_choice", "Hình thang cân có hai đường chéo như thế nào?", ["Bằng nhau", "Vuông góc luôn", "Song song", "Không liên quan"], "Bằng nhau", "Đó là tính chất hình thang cân."], ["input", "Hình thang cân có mấy cạnh đáy song song?", "2", "Hai đáy là một cặp cạnh đối song song."]],
  g8_parallelogram: [["multiple_choice", "Hình bình hành có các cạnh đối như thế nào?", ["Song song và bằng nhau", "Vuông góc", "Luôn bằng 0", "Không song song"], "Song song và bằng nhau", "Đây là tính chất cơ bản."], ["input", "Đường chéo hình bình hành cắt nhau tại gì của mỗi đường?", "trung điểm", "Hai đường chéo cắt nhau tại trung điểm mỗi đường."]],
  g8_rectangle: [["input", "Hình chữ nhật có bao nhiêu góc vuông?", "4", "Hình chữ nhật có bốn góc vuông."], ["multiple_choice", "Hình bình hành có một góc vuông là hình gì?", ["Hình chữ nhật", "Hình thang cân", "Tam giác", "Lục giác"], "Hình chữ nhật", "Một dấu hiệu nhận biết hình chữ nhật."]],
  g8_rhombus_square: [["multiple_choice", "Hình thoi có đặc điểm nào?", ["Bốn cạnh bằng nhau", "Chỉ một góc vuông", "Không có cạnh bằng nhau", "Năm cạnh"], "Bốn cạnh bằng nhau", "Đây là định nghĩa hình thoi."], ["input", "Hình vuông có mấy cạnh bằng nhau?", "4", "Hình vuông có bốn cạnh bằng nhau."]],
  g8_thales: [["multiple_choice", "Trong tam giác ABC, DE song song BC thì tỉ số nào đúng?", ["AD/AB = AE/AC", "AD/DB = AB/BC", "DE/AB = AC/BC", "AD/AC = AE/AB"], "AD/AB = AE/AC", "Định lí Thalès cho các đoạn tương ứng."], ["input", "Nếu AD/AB = 1/2 và AB=10 thì AD bằng bao nhiêu?", "5", "AD = 10 · 1/2."]],
  g8_midline_triangle: [["input", "Đường trung bình tam giác song song cạnh thứ ba và bằng mấy phần cạnh đó?", "1/2", "Độ dài bằng nửa cạnh thứ ba."], ["multiple_choice", "Đường trung bình nối hai điểm nào?", ["Trung điểm hai cạnh", "Hai đỉnh bất kì", "Trọng tâm và đỉnh", "Hai điểm ngoài tam giác"], "Trung điểm hai cạnh", "Cần hai trung điểm."]],
  g8_angle_bisector: [["multiple_choice", "AD là phân giác góc A của tam giác ABC. Tỉ số nào đúng?", ["BD/DC = AB/AC", "BD/AB = DC/AC", "AB/BC = AC/DC", "BD/DC = AC/AB"], "BD/DC = AB/AC", "Tính chất đường phân giác."], ["input", "Nếu AB=6, AC=9, BD/DC bằng phân số nào?", "2/3", "BD/DC = 6/9 = 2/3."]],
  g8_data_collect: [["multiple_choice", "Màu áo yêu thích là dữ liệu gì?", ["Định tính", "Định lượng", "Phương trình", "Đa thức"], "Định tính", "Màu áo là mô tả nhóm."], ["input", "Khảo sát 12 bạn nam và 15 bạn nữ. Tổng số bạn là bao nhiêu?", "27", "Cộng hai nhóm."]],
  g8_data_display: [["multiple_choice", "Dữ liệu theo tháng nên biểu diễn bằng biểu đồ nào để thấy xu hướng?", ["Biểu đồ đoạn thẳng", "Hình thoi", "Tia phân giác", "Phân thức"], "Biểu đồ đoạn thẳng", "Đoạn thẳng cho thấy tăng giảm theo thời gian."], ["input", "40% của hình tròn tương ứng bao nhiêu độ?", "144", "0,4 · 360 = 144."]],
  g8_data_analysis_chart: [["input", "Số liệu tăng từ 45 lên 60. Mức tăng là bao nhiêu?", "15", "60 - 45."], ["multiple_choice", "Khi phân tích biểu đồ, cần đọc gì trước?", ["Tên biểu đồ, trục và đơn vị", "Chỉ màu đẹp", "Số lớn nhất thôi", "Bỏ qua chú giải"], "Tên biểu đồ, trục và đơn vị", "Đọc ngữ cảnh trước khi kết luận."]],
  g8_rational_expr: [["multiple_choice", "Phân thức 1/(x-2) xác định khi nào?", ["x khác 2", "x bằng 2", "x bằng 0", "mọi x"], "x khác 2", "Mẫu phải khác 0."], ["input", "Mẫu của phân thức (x+1)/(x-3) bằng gì?", "x-3", "Mẫu là đa thức ở dưới dấu gạch phân số."]],
  g8_rational_expr_property: [["input", "Rút gọn 2x/4x với x khác 0.", "1/2", "Chia tử và mẫu cho 2x."], ["multiple_choice", "Có được rút gọn (x+1)/(x+2) thành 1/2 không?", ["Không", "Có"], "Không", "Không được xóa hạng tử trong tổng."]],
  g8_rational_expr_add_sub: [["input", "Tính 1/x + 1/x.", "2/x", "Cùng mẫu thì cộng tử."], ["multiple_choice", "1/x + 1/2x bằng?", ["3/2x", "2/3x", "2/x", "1/3x"], "3/2x", "Quy đồng mẫu 2x."]],
  g8_rational_expr_mul_div: [["multiple_choice", "(x/2):(x/4) với x khác 0 bằng?", ["2", "1/2", "x/8", "x^2/8"], "2", "Nhân với phân thức nghịch đảo 4/x."], ["input", "Tính (2/x)*(x/3) với x khác 0.", "2/3", "Rút gọn x."]],
  g8_linear_equation: [["input", "Giải 3x - 6 = 0. x = ?", "2", "3x=6 nên x=2."], ["multiple_choice", "2x+4=10 thì x bằng?", ["3", "7", "5", "12"], "3", "2x=6."]],
  g8_word_equation: [["input", "Một số cộng 5 bằng 12. Số đó là?", "7", "Gọi số đó là x, x+5=12."], ["multiple_choice", "Bước đầu khi giải bài toán bằng lập phương trình là gì?", ["Chọn ẩn", "Vẽ biểu đồ", "Tính xác suất", "Rút gọn phân thức"], "Chọn ẩn", "Cần xác định đại lượng chưa biết."]],
  g8_function_graph_intro: [["input", "Với y=2x+1, khi x=3 thì y bằng bao nhiêu?", "7", "2·3+1=7."], ["multiple_choice", "Điểm (1;3) có thuộc đồ thị y=2x+1 không?", ["Có", "Không"], "Có", "Thay x=1 được y=3."]],
  g8_linear_function: [["multiple_choice", "Đồ thị của hàm số bậc nhất y=ax+b là gì?", ["Đường thẳng", "Đường tròn", "Tam giác", "Hình hộp"], "Đường thẳng", "Hàm bậc nhất có đồ thị là đường thẳng."], ["input", "Hàm y=2x+1 cắt trục Oy tại tung độ bao nhiêu?", "1", "b là tung độ gốc."]],
  g8_slope: [["multiple_choice", "Trong y=3x+2, hệ số góc là gì?", ["3", "2", "x", "5"], "3", "Hệ số góc là hệ số của x."], ["input", "Đường thẳng y=-2x+1 đi lên hay đi xuống khi nhìn từ trái sang phải?", "đi xuống", "Hệ số góc âm."]],
  g8_outcomes: [["multiple_choice", "Gieo xúc xắc, kết quả thuận lợi cho biến cố ra số chẵn là gì?", ["2,4,6", "1,3,5", "1,2,3", "6"], "2,4,6", "Các số chẵn trên xúc xắc."], ["input", "Gieo xúc xắc thường có bao nhiêu kết quả có thể?", "6", "Các mặt 1 đến 6."]],
  g8_probability_ratio: [["input", "Xác suất gieo xúc xắc ra số chẵn là bao nhiêu?", "1/2", "Có 3 kết quả thuận lợi trên 6."], ["multiple_choice", "Túi có 2 bi đỏ, 3 bi xanh. Xác suất lấy bi đỏ là?", ["2/5", "3/5", "2/3", "1/2"], "2/5", "Có 2 thuận lợi trên 5 viên."]],
  g8_experimental_probability: [["input", "Tung xu 100 lần, mặt sấp 48 lần. Xác suất thực nghiệm là gì?", "48/100", "Số lần xảy ra chia tổng số lần thử."], ["multiple_choice", "Khi số lần thử tăng, xác suất thực nghiệm thường thế nào?", ["Gần xác suất lí thuyết hơn", "Luôn bằng 0", "Luôn bằng 1", "Không cần dữ liệu"], "Gần xác suất lí thuyết hơn", "Luật số lớn ở mức trực quan."]],
  g8_similar_triangles: [["multiple_choice", "Hai tam giác đồng dạng có các góc tương ứng như thế nào?", ["Bằng nhau", "Bù nhau", "Vuông góc", "Không liên quan"], "Bằng nhau", "Đây là dấu hiệu cơ bản."], ["input", "Nếu tỉ số đồng dạng là 2 và cạnh nhỏ là 5 thì cạnh tương ứng lớn là bao nhiêu?", "10", "Nhân với tỉ số 2."]],
  g8_similarity_cases: [["multiple_choice", "Hai góc tương ứng bằng nhau là trường hợp đồng dạng nào?", ["g.g", "c.c.c bằng nhau", "cạnh huyền", "trung tuyến"], "g.g", "Góc-góc."], ["input", "Viết tắt cạnh-góc-cạnh đồng dạng.", "c.g.c", "Hai cạnh tỉ lệ và góc xen giữa bằng nhau."]],
  g8_pythagore: [["input", "Tam giác vuông có hai cạnh góc vuông 3 và 4. Cạnh huyền là?", "5", "3^2+4^2=25."], ["multiple_choice", "Định lí Pythagore áp dụng cho tam giác nào?", ["Tam giác vuông", "Mọi tứ giác", "Hình thoi", "Biểu đồ"], "Tam giác vuông", "Cần có góc vuông."]],
  g8_right_triangle_similarity: [["multiple_choice", "Hai tam giác vuông có một góc nhọn bằng nhau thì chúng thế nào?", ["Đồng dạng", "Bằng nhau luôn", "Vuông góc", "Không liên quan"], "Đồng dạng", "Có góc vuông và một góc nhọn bằng nhau."], ["input", "Tam giác vuông đã có sẵn một góc bao nhiêu độ?", "90", "Đó là góc vuông."]],
  g8_similar_figures: [["multiple_choice", "Bản đồ tỉ lệ và vùng đất thật là hai hình gì?", ["Đồng dạng", "Đối đỉnh", "Không gian mẫu", "Phân thức"], "Đồng dạng", "Cùng hình dạng, khác kích thước."], ["input", "Nếu tỉ lệ là 1:100, độ dài 2 cm trên bản vẽ tương ứng bao nhiêu cm thật?", "200", "2 nhân 100."]],
  g8_triangular_pyramid: [["multiple_choice", "Đáy của hình chóp tam giác đều là hình gì?", ["Tam giác đều", "Hình vuông", "Hình tròn", "Hình thoi"], "Tam giác đều", "Tên hình cho biết đáy."], ["input", "Hình chóp tam giác đều có bao nhiêu mặt bên?", "3", "Mỗi cạnh đáy tạo một mặt bên."]],
  g8_square_pyramid: [["input", "Thể tích chóp có S đáy = 12, chiều cao = 9 là bao nhiêu?", "36", "V = 1/3 · 12 · 9."], ["multiple_choice", "Đáy hình chóp tứ giác đều là hình gì?", ["Hình vuông", "Tam giác đều", "Hình tròn", "Đoạn thẳng"], "Hình vuông", "Tứ giác đều là hình vuông trong chương trình này."]]
};

const errors = [
  ["g8_poly_multiply", "x^2+6", "distribution_error", "Bỏ sót tích chéo", "Khi nhân hai nhị thức, cần nhân tất cả cặp hạng tử.", "Với (x+2)(x+3), hạng tử giữa là 3x+2x."],
  ["g8_poly_div_monomial", "2x", "division_error", "Chia thiếu hạng tử", "Mỗi hạng tử của đa thức đều phải chia cho đơn thức.", "3x : 3x = 1 nên kết quả có thêm +1."],
  ["g8_identity_square", "x^2+4", "identity_error", "Thiếu hạng tử 2ab", "(x+2)^2 không chỉ là x^2+4.", "Bình phương tổng có hạng tử giữa 2·x·2."],
  ["g8_factorization", "(x-4)^2", "factorization_error", "Nhầm hiệu hai bình phương", "x^2-16 là hiệu hai bình phương, không phải bình phương một hiệu.", "a^2-b^2=(a-b)(a+b)."],
  ["g8_quadrilateral", "180", "angle_sum_error", "Nhầm tổng góc tứ giác với tam giác", "Tứ giác có tổng góc 360 độ.", "Có thể chia tứ giác thành hai tam giác."],
  ["g8_thales", "AD/AC", "ratio_error", "Ghép sai đoạn tương ứng", "Định lí Thalès yêu cầu ghép các đoạn cùng nằm trên hai cạnh tương ứng.", "Vẽ lại hình và đánh dấu các đoạn tương ứng."],
  ["g8_rational_expr_property", "1/2", "invalid_cancel_error", "Rút gọn sai kiểu xóa hạng tử", "Không được rút gọn từng hạng tử trong tổng nếu không có nhân tử chung.", "Hãy phân tích tử, mẫu thành tích trước khi rút gọn."],
  ["g8_rational_expr_add_sub", "2/3x", "denominator_error", "Cộng mẫu phân thức", "Khi cộng phân thức, không cộng hai mẫu với nhau.", "Quy đồng mẫu rồi cộng tử."],
  ["g8_linear_equation", "3", "equation_error", "Chia hoặc chuyển vế chưa đúng", "Với 3x-6=0, cần chuyển -6 sang vế phải rồi chia 3.", "3x=6 nên x=2."],
  ["g8_slope", "2", "slope_error", "Nhầm hệ số góc với tung độ gốc", "Trong y=ax+b, hệ số góc là a.", "Số đứng trước x mới là hệ số góc."],
  ["g8_probability_ratio", "3/6", "not_simplified", "Có thể rút gọn xác suất", "3/6 đúng về đếm nhưng nên rút gọn thành 1/2.", "Chia cả tử và mẫu cho 3."],
  ["g8_pythagore", "7", "pythagore_error", "Cộng cạnh thay vì cộng bình phương", "Định lí Pythagore dùng bình phương độ dài, không cộng trực tiếp hai cạnh.", "3^2+4^2=25 nên cạnh huyền là 5."],
  ["g8_square_pyramid", "108", "pyramid_volume_error", "Thiếu hệ số 1/3", "Thể tích hình chóp bằng một phần ba diện tích đáy nhân chiều cao.", "V = 1/3 · Sđáy · h."]
];

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));

function makeSkill(item, index) {
  const [id, title, chapter, description, visualization] = item;
  const chapterNames = [...new Set(grade8.map((lesson) => lesson[2]))];
  const lessonNo = Number(title.match(/Bài (\d+)/)?.[1] || index + 1);
  return {
    id,
    title,
    grade: 8,
    book: lessonNo <= 20 ? "Tập 1" : "Tập 2",
    chapter,
    chapterIndex: chapterNames.indexOf(chapter) + 1,
    lessonNo,
    domain: chapter,
    level: lessonNo < 15 ? 3 : lessonNo < 30 ? 4 : 5,
    prerequisite: index === 0 ? [] : [grade8[index - 1][0]],
    description,
    visualization
  };
}

function makeLesson([id, title, chapter, description, visualization]) {
  const [visualTitle, visualContent, example, summary] = core[id];
  const lessonNo = Number(title.match(/Bài (\d+)/)?.[1] || 1);
  return {
    id,
    title,
    skill: id,
    chapter,
    source: "Bám mạch SGK Toán 8 - Kết nối tri thức với cuộc sống, nội dung và câu hỏi tự biên soạn.",
    xp: lessonNo < 15 ? 70 : lessonNo < 30 ? 80 : 90,
    steps: [
      { type: "intro", title: "Mục tiêu vi kỹ năng", content: description },
      { type: "visualization", title: visualTitle, content: visualContent, visualization },
      { type: "example", title: "Ví dụ tự tạo", content: example },
      { type: "summary", title: "Ghi nhớ nhanh", content: summary }
    ]
  };
}

function makeQuestions([id]) {
  return q[id].map(([type, question, choicesOrAnswer, answerOrHint, maybeHint], index) => {
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

function upsertById(existing, incoming) {
  const map = new Map(existing.map((item) => [item.id, item]));
  incoming.forEach((item) => map.set(item.id, item));
  return [...map.values()];
}

const existingSkills = await readJson(paths.skills);
const existingLessons = await readJson(paths.lessons);
const existingQuestions = await readJson(paths.questions);
const existingErrors = await readJson(paths.errors);

const nextSkills = grade8.map(makeSkill);
const nextLessons = grade8.map(makeLesson);
const nextQuestions = grade8.flatMap(makeQuestions);
const nextErrors = errors.map(([skill, pattern, errorType, title, message, hint]) => ({
  pattern,
  skill,
  errorType,
  title,
  message,
  hint,
  recommendation: skill
}));

await writeFile(paths.skills, `${JSON.stringify(upsertById(existingSkills, nextSkills), null, 2)}\n`);
await writeFile(paths.lessons, `${JSON.stringify(upsertById(existingLessons, nextLessons), null, 2)}\n`);
await writeFile(paths.questions, `${JSON.stringify(upsertById(existingQuestions, nextQuestions), null, 2)}\n`);
await writeFile(paths.errors, `${JSON.stringify([...existingErrors.filter((item) => !nextErrors.some((next) => next.skill === item.skill && next.pattern === item.pattern)), ...nextErrors], null, 2)}\n`);

console.log(`Added ${nextSkills.length} grade 8 skills, ${nextLessons.length} lessons, ${nextQuestions.length} questions, ${nextErrors.length} error patterns.`);
