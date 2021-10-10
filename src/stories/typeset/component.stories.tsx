import * as React from "react";

import { CoreLink, CoreText, Header, Typeset } from "v2";

export default { title: Typeset.displayName };

export const example = () => (
  <div>
    <CoreText>Typeset Component</CoreText>
    <Typeset>
      <h1>Join us for TwitchCon Developer Day!</h1>
      <p>
        Following this year’s release of streamer- and developer-friendly
        products like Drops and Twitch Games Commerce, we’re continuing our
        commitment to the developer community by hosting our first
        developer-dedicated event at{" "}
        <a href="https://www.twitchcon.com/">TwitchCon 2017</a>.
      </p>
      <h3>Don't Miss Developer Day!</h3>
      <p>
        <blockquote>
          Developer Day will be held on October 19 in Long Beach, CA, one day
          prior to TwitchCon.
        </blockquote>
      </p>
      <p>
        <strong>
          Developer Day will be held on October 19 in Long Beach, CA
        </strong>
        , one day prior to TwitchCon. Game creators and stream tools developers
        of all levels, from hobbyists to AAA studios, are invited to learn more
        about the Twitch Developer Platform, hear directly from the people
        behind the products, and share experiences with each other.
      </p>
      <p>
        Join us at:
        <ul>
          <li>
            <a href="http://dev.twitch.tv/">dev.twitch.tv</a>
          </li>
          <li>
            <a href="https://twitter.com/TwitchDev">@TwitchDev</a>
          </li>
        </ul>
      </p>
      <pre>
        <code>$ echo "Hello world!"</code>
      </pre>
      <h6>It's gonna be awesome!</h6>
      <p>
        Developer Day will be held on <code>October 19</code> in Long Beach, CA,
        one day prior to TwitchCon. Game creators and stream tools developers of
        all levels, from hobbyists to AAA studios, are invited to learn more
        about the Twitch Developer Platform, hear directly from the people
        behind the products, and share experiences with each other.
      </p>
    </Typeset>
  </div>
);

export const vietnamese = () => (
  <Typeset>
    <Header>
      <CoreLink linkTo="https://vietnamesetypography.com/samples/lac-long-quan-au-co/">
        Source
      </CoreLink>
    </Header>
    <h1>Truyền thuyết Lạc Long Quân và Âu Cơ</h1>
    <p>
      Cách đây lâu đời lắm, ở Lĩnh Nam có một thủ lĩnh tên là Lộc Tục, hiệu là
      Kinh Dương Vương, sức khoẻ tuyệt trần, lại có tài đi lại dưới nước như đi
      trên cạn. Một hôm, Kinh Dương Vương đi chơi hồ Ðộng Ðình, gặp Long Nữ là
      con gái Long Vương, hai người kết thành vợ chồng và ít lâu sau sinh được
      một trai, đặt tên là Sùng Lâm. Lớn lên Sùng làm rất khoẻ, một tay có thể
      nhấc bổng lên cao tảng đá hai người ôm. Cũng như cha, Sùng Lâm có tài đi
      lại dưới nước như đi trên cạn. Khi nối nghiệp cha, chàng lấy hiệu là Lạc
      Long Quân.
    </p>
    <p>
      Lúc bấy giờ ở đất Lĩnh Nam còn hoang vu, không một nơi nào yên ổn, Lạc
      Long Quân quyết chí đi du ngoạn khắp nơi.
    </p>
    <p>
      Ðến vùng bờ biển Ðông Nam, Lạc Long Quân gặp một con cá rất lớn. Con cá
      này đã sống từ lâu đời, mình dài hơn năm mươi trượng, đuôi như cánh buồm,
      miệng có thể nuốt chửng mười người một lúc. Khi nó bơi thì sóng nổi ngất
      trời, thuyền bè qua lại đề bị nó nhận chìm, người trên thuyền đều bị nó
      nuốt sống. Dân chài rất sợ con quái vật ấy. Họ gọi nó là Ngư tinh. Chỗ ở
      của Ngư tinh là một cái hang lớn ăn sâu xuống đáy biển, trên hang có một
      dãy núi đá cao ngăn miền duyên hải ra làm hai vùng.
    </p>
    <p>
      Lạc Long Quân quyết tâm giết loài yêu quái, trừ hại cho dân, Lạc Long Quân
      đóng một chiếc thuyền thật chắc và thật lớn, rèn một khối sắt có nhiều
      cạnh sắc, nung cho thật đỏ, rồi đem khối sắt xuống thuyền chèo thẳng đến
      Ngư Tinh, Lạc Long Quân giơ khối sắt lên giả cách như cầm một người ném
      vào miệng cho nó ăn. Ngư Tinh há miệng đón mồi. Lạc Long Quân lao thẳng
      khối sắt nóng bỏng vào miệng nó. Ngư Tinh bị cháy họng vùng lên chống cự,
      quật đuôi vào thuyền của Lạc Long Quân. Lạc Long Quân liền rút gươm chém
      Ngư Tinh làm ba khúc. Khúc đầu hoá thành con chó biển. Lạc Long Quân lấy
      đá ngăn biển chặn đường giết chết con chó biển, vứt đầu lên một hòn núi,
      nay gọi hòn núi ấy là Cẩu Ðầu Sơn, khúc mình của Ngư Tinh trôi ra xứ Mạn
      Cẩu, nay còn gọi là Cẩu Ðầu Thủy, còn khúc đuôi của Ngư Tinh thì Lạc Long
      Quân lột lấy da đem phủ lên hòn đảo giữa biển, đảo ấy nay còn mang tên là
      Bạch Long Vĩ.
    </p>
    <p>
      Trừ xong nạn Ngư Tinh, Lạc Long Quân đến Long Biên. Ở đây có con cáo chín
      đuôi sống đến hơn nghìn năm, đã thành tinh. Nó trú trong một hang sâu,
      dưới chân một hòn núi đá ở phía Tây Long Biên. Con yêu này thường hóa
      thành người trà trộn trong nhân dân dụ bắt con gái đem về hang hãm hại.
      Một vùng từ Long Biên đến núi Tản Viên, đâu đâu cũng bị Hồ Tinh hãm hại.
      Nhân dân hai miền rất lo sợ, nhiều người phải bỏ cả ruộng đồng, nương rẫy,
      kéo nhau đi nơi khác làm ăn.
    </p>
    <p>
      Lạc Long Quân thương dân, một mình một gươm đến sào huyệt Hồ tinh, tìm
      cách diệt trừ nó. Khi Lạc Long Quân về đến tới cửa hang, con yêu tinh thấy
      bóng người, liền xông ra, Lạc Long Quân liền hoá phép làm mưa gió, sấm sét
      vây chặt lấy con yêu. Giao chiến luôn ba ngày ba đêm, con yêu dần dần yếu
      sức, tìm đường tháo chạy, Lạc Long Quân đuổi theo chém đứt đầu nó. Nó hiện
      nguyên hình là một con cáo khổng lồ chín đuôi. Lạc Long Quân vào hang cứu
      những người còn sống sót, rồi sai các loài thủy tộc dâng nước sông Cái,
      xoáy hang cáo thành một vực sâu, người đương thời gọi là đầm Xác Cáo, đời
      sau mới gọi là Tây Hồ.
    </p>
    <p>
      Dẹp yên nạn Hồ Tinh nhân dân quanh vùng lại trở về cày cấy trên cánh đồng
      ven hồ, và dựng nhà lập xóm trên khu đất cao nhất gọi là làng Hồ, đến nay
      vẫn còn.
    </p>
    <p>
      Thấy dân vùng Long Biên đã được yên ổn làm ăn Lạc Long Quân đi ngược lên
      vùng rừng núi đến đất Phong Châu. Ở vùng này có một cây cổ thụ gọi là cây
      chiên đàn, cao hàng nghìn trượng, trước kia cành lá sum suê tươi tốt che
      kín cả một khoảng đất rộng, nhưng sau nhiều năm, cây khô héo, biến thành
      yêu tinh, người ta gọi là Mộc Tinh. Con yêu này hung ác và quỷ quyệt lạ
      thường. Chỗ ở của nó không nhất định, khi thì ở khu rừng này, khi thì ở
      khu rừng khác. Nó còn luôn luôn thay hình đổi hạng ẩn nấp khắp nơi, dồn
      bắt người để ăn thịt. Ði đến đâu cũng nghe thấy tiếng khóc than thảm
      thiết, Lạc Long Quân quyết ra tay cứu dân diệt trừ loài yêu quái. Lạc Long
      quân phải luồn hết rừng này đến rừng kia và qua nhiều ngày gian khổ mới
      tìm thấy chỗ ở của con yêu. Lạc Long Quân giao chiến với nó trăm ngày đêm,
      làm cho cây long đá lở, trời đất mịt mù mà không thắng được nó. Cuối cùng
      Lạc Long Quân phải dùng đến những nhạc cụ như chiêng, trống làm nó khiếp
      sợ và chạy về phía Tây Nam, sống quanh quất ở vùng đó, người ta gọi là Quỷ
      Xương Cuồng.{" "}
    </p>
    <p>
      Diệt xong được nạn yêu quái, Lạc Long Quân thấy dân vùng này vẫn còn đói
      khổ thiếu thốn, phải lấy vỏ cây che thân, tết cỏ gianh làm ổ nằm bèn dạy
      cho dân biết cách trồng lúa nếp, lấy ống tre thổi cơm, đốn gỗ làm nhà sàn
      để ở, phòng thú dữ. Lạc Long Quân còn dạy dân ở cho ra cha con, vợ chồng.
      Dân cảm ơn đức ấy, xây cho Lạc Long Quân một toà cung điện nguy nga trên
      một ngọn núi cao. Nhưng Lạc Long Quân không ở, thường về quê mẹ dưới thủy
      phủ và dặn dân chúng rằng: “Hễ có tai biến gì thì gọi ta, ta sẽ về ngay!”
    </p>
    <p>
      Lúc bấy giờ có Ðế Lai từ phương Bắc đem quân tràn xuống phương Nam. Ðế Lai
      đem theo cả người con gái yêu rất xinh đẹp của mình là Âu Cơ và nhiều thị
      nữ. Thấy Lĩnh Nam phong cảnh tươi đẹp, lại nhiều chim muông, nhiều gỗ quý.
      Ðế Lai sai quân dựng thành đắp lũy định ở lâu dài. Phải phục dịch rất cực
      khổ, nhân dân chịu không nổi, hướng về biển Ðông gọi to: “Bố ơi! Sao không
      về cứu dân chúng con!”. Chỉ trong chớp mắt, Lạc Long Quân đã về.
    </p>
    <p>
      Nhân dân kể chuyện, Lạc Long Quân hóa làm một chàng trai rất đẹp, có hàng
      trăm đầy tớ theo hầu, vừa đi vừa hát đến thẳng chỗ Ðế Lai ở. Lạc Long Quân
      không thấy Ðế Lai đâu cả, mà chỉ thấy một cô gái nhan sắc tuyệt trần cùng
      vô số thị tỳ và binh lính. Cô gái xinh đẹp đó là Âu Cơ. Thấy Lạc Long Quân
      uy nghi tuấn tú nàng đem lòng say mê, xin đi theo Lạc Long Quân. Lạc Long
      Quân đưa Âu Cơ về ở trong cung điện của mình, trên núi cao. Ðế Lai về,
      không thấy con gái đâu, liền sai quân lính đi tìm khắp nơi, hết ngày này
      qua ngày khác. Lạc Long Quân sai hàng vạn các ác thú ra chặn các nẻo
      đường, xé xác bọn chúng làm cho chúng khiếp sợ bỏ chạy. Ðế Lai đành thu
      quân về phương bắc.
    </p>
    <p>
      Lạc Long Quân ở với Âu Cơ được ít lâu thì Âu Cơ có mang, sinh ra một cái
      bọc. Sau bảy ngày cái bọc nở ra một trăm quả trứng. Mỗi trứng nở ra một
      người con trai. Trăm người con trai đó lớn lên như thổi, tất cả đều xinh
      đẹp khoẻ mạnh và thông minh tuyệt vời.
    </p>
    <p>
      Hàng chục năm trôi qua, Lạc Long Quân sống đầm ấm bên cạnh đàn con, nhưng
      lòng vẫn nhớ thủy phủ. Một hôm Lạc Long Quân từ giã Âu Cơ và đàn con, hóa
      làm một con rồng vụt bay lên mây, bay về biển cả. Âu Cơ và đàn con muốn
      theo Lạc Long Quân, nhưng không đi được, buồn bã ở lại trên núi. Hết ngày
      này qua ngày khác, họ mỏi mắt trông chờ mà vẫn biền biệt tăm hơi. Không
      thấy Lạc Long Quân trở về, nhớ chồng quá, Âu Cơ đứng trên ngọn núi cao
      hướng về biển Ðông lên tiếng gọi: “Bố nó ơi! Sao không về để mẹ con chúng
      tôi sầu khổ thế này”.{" "}
    </p>
    <p>Lạc Long Quân trở về tức khắc. Âu Cơ trách chồng:</p>
    <blockquote>
      Thiếp vốn sinh trưởng ở núi cao, động lớn, ăn ở với chàng sinh được trăm
      trai, thế mà chàng nỡ lòng bỏ đi, để mặc con thiếp sống bơ vơ khổ não.{" "}
    </blockquote>
    <p>Lạc Long Quân nói:</p>
    <blockquote>
      Ta là loài rồng, nàng là giống tiên, khó ở với nhau lâu dài. Nay ta đem
      năm mươi con về miền biển, còn nàng đem năm mươi con về miền núi, chia
      nhau trị vì các nơi, kẻ lên núi, người xuống biển, nếu gặp sự nguy hiểm
      thì báo cho nhau biết, cứu giúp lẫn nhau, đừng có quên.{" "}
    </blockquote>
    <p>
      Hai người từ biệt nhau, trăm người con trai tỏa đi các nơi, trăm người đó
      trở thành tổ tiên của người Bách Việt. Người con trưởng ở lại đất Phong
      Châu, được tôn làm vua nước Văn Lang lấy hiệu là Hùng Vương. Vua Hùng chia
      ra làm mười năm bộ, đặt tướng văn, võ gọi là lạc hầu, lạc tướng. Con trai
      vua gọi là Quan Lang, con gái vua gọi là Mỵ Nương. Ngôi vua đời đời gọi
      chung một danh hiệu là Hùng Vương.
    </p>
    <p>
      Lạc Long Quân là người mở mang cõi Lĩnh Nam, đem lại sự yên ổn cho dân.
      Vua Hùng là người dựng nước, truyền nối được mười tám đời. Do sự tích Lạc
      Long Quân và Âu Cơ, nên dân tộc Việt Nam vẫn kể mình là dòng giống Tiên
      Rồng.
    </p>
  </Typeset>
);

export const greek = () => (
  <Typeset>
    <Header>
      <CoreLink linkTo="http://www.ilearngreek.com/mythology/GODS/hermes.G5.asp">
        Source
      </CoreLink>
    </Header>
    <h1>Ο Ερμής</h1>
    <p>
      Ο θεός Ερμής ήταν γιος του Δία και της Μαίας. Ήταν ο αγγελιοφόρος των
      θεών. Γεννήθηκε σε μια σπηλιά στην Αρκαδία.
    </p>
    <p>
      Ήταν γρήγορος σαν τον άνεμο και φορούσε πέδιλα με φτερά. Ήταν φρουρός στα
      σταυροδρόμια και στις εισόδους των σπιτιών. Προστάτευε το εμπόριο, τους
      ταξιδιώτες και τους αθλητές.
    </p>
    <p>
      Είχε όμως και άλλο ταλέντο. Του άρεσε να κάνει αστεία στους θεούς και ήταν
      ταλαντούχος κλέφτης. Έκλεψε το τόξο και τα βέλη του Απόλλωνα, την τρίαινα
      του Ποσειδώνα και το σπαθί του Άρη.
    </p>
    <p>
      Σε ένα άλλο περιστατικό, έκλεψε τις ιερές αγελάδες του Απόλλωνα. Ο
      Απόλλωνας το ανακάλυψε και θύμωσε με τον νεαρό θεό. Μετά από πολλές μέρες,
      ο Ερμής έδειξε στον Απόλλωνα το μέρος που ήταν κρυμμένες οι αγελάδες.
      Πήγαν εκεί μαζί και ο Απόλλωνας άρχισε να τις πέρνει πίσω. Ο Ερμής κάθησε
      σε μια πέτρα και έπαιξε την λύρα τόσο καλά, που ο Απόλλωνας του έδωσε τις
      αγελάδες δώρο.
    </p>
    <p>
      Κάθε Έλληνας στην αρχαία Ελλάδα αγαπούσε τον Ερμή. Αγάλματα χτίζονταν σε
      κάθε σταυροδρόμι και στις εισόδους των σπιτιών. Αυτά τα αγάλματα τα
      ονόμαζαν "οι στήλες του Ερμή".
    </p>{" "}
  </Typeset>
);

export const cyrllic = () => (
  <Typeset>
    <Header>
      <CoreLink linkTo="http://kazkar.info/ua/__van_pobivan/">Source</CoreLink>
    </Header>
    <h1>Іван-побиван</h1>
    <p>
      Унадивсь колись давним-давно один страшний змій десь у якусь слободу людей
      їсти та й виїв чисто всіх, зостався один тільки дід.
    </p>
    <blockquote>— Ну,— каже змій,— завтра тобою поснідаю.</blockquote>
    <p>
      А через ту слободу ішов один бідний хлопець та й зайшов до того діда,
      проситься ночувати.
    </p>
    <blockquote>— А хіба тобі жити надокучило? — питає його дід.</blockquote>
    <blockquote>— Як? — каже бідний хлопець.</blockquote>
    <p>
      Дід розказав йому, що тут змій усіх людей переїв і це завтра його з'їсть.
    </p>
    <blockquote>— Е,— каже хлопець,— подавиться!</blockquote>
    <p>От уранці прилітає змій, побачив хлопця.</p>
    <blockquote>
      — О, це добре,— каже,— був один, а тепер двоє. А хлопець:
    </blockquote>
    <blockquote>— Гляди, не подавись! Змій і дивується.</blockquote>
    <blockquote>— Як,— каже,— хіба ти сильніший за мене?</blockquote>
    <blockquote>— Авжеж.</blockquote>
    <p>
      — Який же ти сильний? Я он, бач...— Та взяв камінь, як здавив, так з
      каменя мука і посипалась.
    </p>
    <blockquote>
      — Е, це дурниця,— каже хлопець,— здави так, щоб з нього юшка потекла.
    </blockquote>
    <p>
      Та тут же взяв з мисника ворочок сиру, та як натисне, так з нього
      сироватка і потекла.
    </p>
    <blockquote>— Отак,— каже,— дави.</blockquote>
    <blockquote>
      — Ну, ходім,— каже змій,— за товариша будеш. А хлопець йому:
    </blockquote>
    <blockquote>— Хіба за старшого.</blockquote>
    <p>Ото й пішли. Питає його змій:</p>
    <blockquote>— А як звуть тебе?</blockquote>
    <blockquote>— Іван-Побиван,— каже хлопець.</blockquote>
  </Typeset>
);
