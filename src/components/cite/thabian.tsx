import { ReactNode } from "react";

import "./typo.css";

export const THABIANS_CRITERIAS: Record<
  string,
  {
    question: ReactNode;
    criteria: ReactNode;
    maxScore: number;
  }
> = {
  "1": {
    question: (
      <div className="text-base">
        1.น้องคาดหวังอะไรจากค่าย ComCamp36{" "}
        <span className="text-blue-500">
          (วัดความสามารถในการคิดเชิงวิเคราะห์)
        </span>
      </div>
    ),
    criteria: (
      <ul className="ml-6">
        <li>
          มีความคาดหวังที่ชัดเจน
          พร้อมอธิบายสิ่งที่คาดหวังให้เห็นภาพได้เป็นอย่างดี{" "}
          <span className="text-red-500">(5 คะแนน)</span>
        </li>
        <li>
          มีความคาดหวังที่ค่อนข้างชัดเจน
          แต่อธิบายสิ่งที่คาดหวังได้ยังไม่เห็นภาพมากนัก{" "}
          <span className="text-red-500">(3 คะแนน)</span>
        </li>
        <li>
          ไม่แสดงให้เห็นถึงความคาดหวัง/ตอบคำถามผิดประเด็น/ไม่ตอบคำถาม{" "}
          <span className="text-red-500">(0 คะแนน)</span>
        </li>
      </ul>
    ),
    maxScore: 5,
  },
  "2": {
    question: (
      <div className="text-base">
        2. ในยุคที่ AI และหุ่นยนต์สามารถทำงานแทนมนุษย์ได้มากขึ้น
        น้องคิดว่าวิศวกรคอมพิวเตอร์ยังมีความสำคัญอย่างไร?{" "}
        <span className="text-blue-500">
          (วัดความสามารถด้านการคิดเชิงวิเคราะห์และการให้เหตุผล)
        </span>
      </div>
    ),
    criteria: (
      <ul className="ml-6">
        <li>
          ความชัดเจนและเหตุผลที่ดี
          <ul className="ml-6">
            <li>
              อธิบาย AI และ Automation ได้อย่างชัดเจน
              ว่ามันมีบทบาทอย่างไรและเปลี่ยนแปลงงานในปัจจุบันอย่างไร
              ให้เหตุผลที่ชัดเจนและครบถ้วนเกี่ยวกับความสำคัญของวิศวกรคอมพิวเตอร์
              มีการเชื่อมโยงที่ดี และอาจมีตัวอย่างประกอบ{" "}
              <span className="text-red-500">(6 คะแนน)</span>
            </li>
            <li>
              อธิบายได้ว่าทำไม AI และ Automation ถึงมีบทบาทมากขึ้น
              แต่ยังไม่สามารถเชื่อมโยงกับความสำคัญของวิศวกรคอมพิวเตอร์ได้อย่างชัดเจน{" "}
              <span className="text-red-500">(5 คะแนน)</span>
            </li>
            <li>
              อธิบายว่า AI และ Automation กำลังเข้ามามีบทบาทมากขึ้น,
              กล่าวถึงวิศวกรคอมพิวเตอร์
              แต่ยังไม่มีเหตุผลที่ชัดเจนว่าทำไมยังจำเป็น{" "}
              <span className="text-red-500">(4 คะแนน)</span>
            </li>
            <li>
              อธิบาย AI และ Automation ได้ระดับหนึ่ง
              แต่ยังไม่สามารถเชื่อมโยงกับบทบาทของวิศวกรคอมพิวเตอร์ได้อย่างดี
              อาจมีบางจุดที่เข้าใจผิด หรือยังไม่ให้เหตุผลที่เพียงพอ{" "}
              <span className="text-red-500">(3 คะแนน)</span>
            </li>
            <li>
              คำตอบกว้างเกินไป หรือไม่สามารถจับประเด็นหลักได้{" "}
              <span className="text-red-500">(2 คะแนน)</span>
            </li>
            <li>
              ตอบที่ไม่ตรงประเด็น
              หรือไม่สามารถเชื่อมโยงเนื้อหากับโจทย์ที่ให้ไปได้{" "}
              <span className="text-red-500">(1 คะแนน)</span>
            </li>
            <li>
              ไม่มีการอธิบายหรือให้เหตุผลที่เกี่ยวข้อง{" "}
              <span className="text-red-500">(0 คะแนน)</span>
            </li>
          </ul>
        </li>
        <li>
          ความคิดสร้างสรรค์และมุมมองต่ออนาคต
          <ul className="ml-6">
            <li>
              นำเสนอแนวคิดที่แปลกใหม่และสร้างสรรค์ ซึ่งแตกต่างจากแนวคิดทั่วไป,
              มีการอธิบายถึงผลกระทบหรือแนวทางพัฒนาอย่างละเอียด,
              เป็นแนวคิดที่สามารถพัฒนาเป็นแนวทางใหม่ในอนาคตได้จริง{" "}
              <span className="text-red-500">(6 คะแนน)</span>
            </li>
            <li>
              นำเสนอแนวคิดที่มีความสร้างสรรค์และแสดงถึงมุมมองที่ลึกซึ้งขึ้นมีความเป็นไปได้ในอนาคต
              และอาจมีตัวอย่างหรือการอธิบายที่ดี{" "}
              <span className="text-red-500">(5 คะแนน)</span>
            </li>
            <li>
              นำเสนอแนวคิดที่เกี่ยวข้องกับอนาคตของวิศวกรคอมพิวเตอร์ได้ดี
              แต่ยังค่อนข้างเป็นแนวคิดที่มีอยู่แล้วมีความเป็นไปได้ในทางปฏิบัติ
              แต่ขาดมุมมองที่แปลกใหม่หรือความเป็นเอกลักษณ์{" "}
              <span className="text-red-500">(4 คะแนน)</span>
            </li>
            <li>
              มีการเสนอแนวคิดใหม่
              แต่ยังขาดความชัดเจนหรือลึกซึ้งพอมีแนวคิดเกี่ยวกับอนาคตที่น่าสนใจ
              แต่ยังไม่ได้อธิบายว่ามันจะพัฒนาไปอย่างไร{" "}
              <span className="text-red-500">(3 คะแนน)</span>
            </li>
            <li>
              มีการแสดงมุมมองต่ออนาคต แต่ยังไม่ลึกพอ
              หรือยังเป็นแนวคิดที่พบเห็นได้ทั่วไปไม่มีตัวอย่างหรือเหตุผลสนับสนุนที่ชัดเจน{" "}
              <span className="text-red-500">(2 คะแนน)</span>
            </li>
            <li>
              คำตอบยังคลุมเครือ และไม่มีการอธิบายที่เพียงพอ{" "}
              <span className="text-red-500">(1 คะแนน)</span>
            </li>
            <li>
              คำตอบที่ไม่มีความคิดสร้างสรรค์หรือไม่เกี่ยวข้องกับคำถาม{" "}
              <span className="text-red-500">(0 คะแนน)</span>
            </li>
          </ul>
        </li>
        <li>
          การให้มุมมองที่รอบด้าน
          <ul className="ml-6">
            <li>
              แสดงให้เห็นว่าผู้ตอบมองทั้งด้านบวกและด้านลบของ AI และ Automation
              และมีการพูดถึงโอกาสและความท้าทาย เช่น งานที่ AI อาจแทนที่มนุษย์
              กับงานที่ยังต้องการมนุษย์อยู่{" "}
              <span className="text-red-500">(3 คะแนน)</span>
            </li>
            <li>
              มีมุมมองบางส่วน แต่ยังขาดการวิเคราะห์ด้านผลกระทบของ AI
              อย่างรอบด้าน <span className="text-red-500">(2 คะแนน)</span>
            </li>
            <li>
              มีมุมมองที่ไม่ชัดเจน หรือเน้นเฉพาะด้านใดด้านหนึ่งมากเกินไป{" "}
              <span className="text-red-500">(1 คะแนน)</span>
            </li>
            <li>
              คำตอบที่เขียนขาดการแสดงมุมมองส่วนบุคคล
              หรือขาดการวิเคราะห์ที่ชัดเจน{" "}
              <span className="text-red-500">(0 คะแนน)</span>
            </li>
          </ul>
        </li>
      </ul>
    ),
    maxScore: 15,
  },
  "3": {
    question: (
      <div className="text-base">
        3. หากน้องและทีมจำนวน 5 คน
        กำลังอยู่บนยานอวกาศที่ติดอยู่ในวงโคจรของดาวเคราะห์ดวงหนึ่ง...{" "}
        <span className="text-blue-500">
          (ความสามารถในการทำงานเป็นทีมและภาวะผู้นำ)
        </span>
      </div>
    ),
    criteria: (
      <ul className="ml-6">
        <li>
          การระบุปัญหาหลัก
          <ul className="ml-6">
            <li>
              ระบุปัญหาได้ครบถ้วน (ข้อจำกัดเรื่องทรัพยากร, เวลาที่จำกัด,
              ความขัดแย้งในทีม) และแสดงความเข้าใจถึงผลกระทบระยะสั้นและระยะยาว{" "}
              <span className="text-red-500">(4 คะแนน)</span>
            </li>
            <li>
              ระบุปัญหาได้ส่วนใหญ่ แต่ขาดความลึกซึ้งในการวิเคราะห์ผลกระทบ{" "}
              <span className="text-red-500">(3-2 คะแนน)</span>
            </li>
            <li>
              ระบุปัญหาได้บางส่วน
              หรือมุ่งเน้นแค่ปัญหาใดปัญหาหนึ่งโดยไม่คำนึงถึงผลกระทบภาพรวม{" "}
              <span className="text-red-500">(1 คะแนน)</span>
            </li>
            <li>
              ไม่สามารถระบุปัญหาได้ชัดเจน หรือมองข้ามประเด็นสำคัญ{" "}
              <span className="text-red-500">(0 คะแนน)</span>
            </li>
          </ul>
        </li>
        <li>
          การวิเคราะห์ทางเลือกและการตัดสินใจ
          <ul className="ml-6">
            <li>
              เสนอแนวทางที่มีความคิดสร้างสรรค์และสอดคล้องกับสถานการณ์
              พร้อมเหตุผลประกอบการตัดสินใจที่สอดคล้องกับข้อจำกัด{" "}
              <span className="text-red-500">(4 คะแนน)</span>
            </li>
            <li>
              เสนอแนวทางที่สามารถนำไปใช้ได้จริงและตรงกับสถานการณ์
              แต่เหตุผลที่สนับสนุนยังไม่ครอบคลุมทุกข้อจำกัด{" "}
              <span className="text-red-500">(3-2 คะแนน)</span>
            </li>
            <li>
              เสนอแนวทางที่ไม่ตรงกับสถานการณ์
              หรือขาดความเป็นไปได้ในการนำไปใช้จริง{" "}
              <span className="text-red-500">(1 คะแนน)</span>
            </li>
            <li>
              ไม่สามารถเสนอทางเลือกที่เหมาะสมหรือไม่มีเหตุผลที่ชัดเจน{" "}
              <span className="text-red-500">(0 คะแนน)</span>
            </li>
          </ul>
        </li>
        <li>
          การจัดการทรัพยากรและการวางแผน
          <ul className="ml-6">
            <li>
              วางแผนการใช้ทรัพยากรได้อย่างมีประสิทธิภาพ
              ครอบคลุมทั้งการแก้ปัญหาในปัจจุบันและการสร้างแผนสำรองในอนาคต{" "}
              <span className="text-red-500">(3 คะแนน)</span>
            </li>
            <li>
              วางแผนได้ดีในระดับพื้นฐาน
              แต่ขาดแผนสำรองหรือรายละเอียดบางส่วนยังไม่ชัดเจน{" "}
              <span className="text-red-500">(2 คะแนน)</span>
            </li>
            <li>
              วางแผนได้ในระดับพื้นฐาน แต่ขาดความครอบคลุม เช่น
              ลืมพิจารณาแผนสำรองในกรณีฉุกเฉิน{" "}
              <span className="text-red-500">(1 คะแนน)</span>
            </li>
            <li>
              ไม่สามารถวางแผนการใช้ทรัพยากรได้อย่างมีเหตุผล
              หรือแผนมีข้อบกพร่องร้ายแรง{" "}
              <span className="text-red-500">(0 คะแนน)</span>
            </li>
          </ul>
        </li>
        <li>
          การจัดการความขัดแย้งและขวัญกำลังใจ
          <ul className="ml-6">
            <li>
              เสนอวิธีแก้ไขความขัดแย้งในทีมได้อย่างเหมาะสม
              พร้อมทั้งแผนฟื้นฟูขวัญกำลังใจอย่างมีประสิทธิภาพ{" "}
              <span className="text-red-500">(3 คะแนน)</span>
            </li>
            <li>
              มีแนวทางในการจัดการความขัดแย้งหรือขวัญกำลังใจ
              แต่ยังขาดความรอบคอบหรือมีช่องโหว่ในแผน{" "}
              <span className="text-red-500">(2 คะแนน)</span>
            </li>
            <li>
              เสนอวิธีการจัดการเพียงเล็กน้อยหรือยังไม่ครอบคลุมความขัดแย้งทั้งหมด{" "}
              <span className="text-red-500">(1 คะแนน)</span>
            </li>
            <li>
              ไม่สามารถเสนอวิธีจัดการความขัดแย้งหรือขวัญกำลังใจได้{" "}
              <span className="text-red-500">(0 คะแนน)</span>
            </li>
          </ul>
        </li>
        <li>
          การสื่อสารและความเป็นผู้นำ
          <ul className="ml-6">
            <li>
              แสดงวิธีการสื่อสารทีมประสิทธิภาพและสร้างความไว้วางใจในทีม
              โดยรักษาความร่วมมือและความสามัคคีได้ดี{" "}
              <span className="text-red-500">(1 คะแนน)</span>
            </li>
            <li>
              ขาดแผนหรือแนวทางในการสื่อสาร และไม่สามารถสร้างความร่วมมือในทีมได้{" "}
              <span className="text-red-500">(0 คะแนน)</span>
            </li>
          </ul>
        </li>
      </ul>
    ),
    maxScore: 15,
  },
  "4": {
    question: (
      <div className="text-base">
        4. หากในค่ายมี Group Project แล้วน้องได้อยู่ในกลุ่มที่มีคนไม่ค่อยทำงาน
        นิ่งเฉย หรือทิ้งงาน น้องจะจัดการกับปัญหานี้อย่างไร?{" "}
        <span className="text-blue-500">
          (ความสามารถในการจัดการอารมณ์และปรับตัว)
        </span>
      </div>
    ),
    criteria: (
      <ul className="ml-6">
        <li>
          การแก้ปัญหา
          <ul className="ml-6">
            <li>
              มีแนวทางแก้ปัญหาที่ชัดเจน รอบคอบ คำนึงถึงความเป็นทีม
              และใช้การสื่อสารที่ดี รวมถึงแผนสำรองในกรณีที่ปัญหายังไม่ถูกแก้ไข{" "}
              <span className="text-red-500">(8 คะแนน)</span>
            </li>
            <li>
              มีแนวทางแก้ปัญหาที่ดี แต่ยังขาดบางแง่มุม เช่น
              วิธีรับมือหากอีกฝ่ายยังคงไม่ร่วมมือ{" "}
              <span className="text-red-500">(7-5 คะแนน)</span>
            </li>
            <li>
              เสนอแนวทางแก้ปัญหาได้
              แต่ยังขาดรายละเอียดหรือไม่ได้คำนึงถึงผลกระทบต่อทีมอย่างรอบด้าน{" "}
              <span className="text-red-500">(4-3 คะแนน)</span>
            </li>
            <li>
              มีแนวคิดพื้นฐานในการจัดการปัญหา แต่แนวทางยังไม่เป็นรูปธรรม
              หรือขาดเหตุผลรองรับที่ดี{" "}
              <span className="text-red-500">(2-1 คะแนน)</span>
            </li>
            <li>
              ไม่สามารถเสนอแนวทางที่เหมาะสม
              หรือไม่มีแนวคิดในการแก้ปัญหาที่ชัดเจน{" "}
              <span className="text-red-500">(0 คะแนน)</span>
            </li>
          </ul>
        </li>
        <li>
          การสื่อสาร
          <ul className="ml-6">
            <li>
              เขียนคำได้ถูกต้อง <span className="text-red-500">(2 คะแนน)</span>
            </li>
            <li>
              เขียนมีคำผิดเล็กน้อย แต่ยังสามารถเข้าใจถึงบริบทได้{" "}
              <span className="text-red-500">(1 คะแนน)</span>
            </li>
            <li>
              เขียนคำผิดค่อนข้างมาก เข้าใจถึงบริบทได้ยาก{" "}
              <span className="text-red-500">(0 คะแนน)</span>
            </li>
          </ul>
        </li>
      </ul>
    ),
    maxScore: 10,
  },
  "5": {
    question: (
      <div className="text-base">
        5. ถ้าต้องสอนเด็ก 7 ขวบให้เข้าใจว่า &quot;Algorithm&quot;
        คืออะไรโดยห้ามใช้คำศัพท์เทคนิค น้องจะอธิบายอย่างไร?{" "}
        <span className="text-blue-500">
          (วัดความรู้และความเข้าใจการคิดเชิงโครงสร้าง, วัดความคิดสร้างสรรค์,
          ความสามารถในการสื่อสาร)
        </span>
      </div>
    ),
    criteria: (
      <ul className="ml-6">
        <li>
          ตอบแนวใช้เกม, ให้เด็กได้ลงมือเล่นเกมจริง เช่น &quot;Algorithm
          คือวิธีหาของเล่นที่ซ่อนอยู่
          ลองคิดสิว่าต้องทำอะไรก่อน-หลัง?&quot;และมีความสนุกหรือดึงดูดเด็ก{" "}
          <span className="text-red-500">(9-10 คะแนน)</span>
        </li>
        <li>
          ให้เด็กมีส่วนร่วมผ่านการตอบโต้ แต่ยังไม่ถึงขั้นให้ลงมือทำเองจริง ๆ
          อาจใช้ตัวอย่างจากชีวิตประจำวัน เช่น &quot;Algorithm
          ก็เหมือนทางเดินกลับบ้าน เราต้องเลือกว่าจะเลี้ยวซ้ายหรือขวา
          เพื่อไปถึงบ้าน&quot; <span className="text-red-500">(7-8 คะแนน)</span>
        </li>
        <li>
          เด็กสามารถเข้าใจได้ แต่ไม่ได้มีส่วนร่วมมากนัก
          หรือไม่มีแรงจูงใจให้เด็กอยากคิดต่อ มีตัวอย่างที่เข้าใจง่ายขึ้น เช่น
          &quot;Algorithm ก็เหมือนการแปรงฟัน ต้องทำตามขั้นตอน เช่น บีบยาสีฟัน
          แปรงซ้าย ขวา ฯลฯ&quot; แต่ยังขาดความสนุกหรือดึงดูดเด็ก{" "}
          <span className="text-red-500">(5-6 คะแนน)</span>
        </li>
        <li>
          มีตัวอย่างช่วยอธิบาย แต่ยังไม่ชัดเจน เช่น &quot;Algorithm
          คือสูตรทำอาหาร&quot;
          แต่ไม่ได้อธิบายว่ามันเกี่ยวข้องกับลำดับขั้นตอนอย่างไร{" "}
          <span className="text-red-500">(3-4 คะแนน)</span>
        </li>
        <li>
          ใช้ศัพท์เทคนิคยาก หรืออธิบายแบบท่องนิยาม เช่น &quot;Algorithm
          คือชุดคำสั่งที่...&quot;หรือ อธิบายแบบนิยามตรง ๆ
          โดยไม่พยายามเปรียบเทียบหรือทำให้เด็กเห็นภาพ{" "}
          <span className="text-red-500">(0-2 คะแนน)</span>
        </li>
      </ul>
    ),
    maxScore: 10,
  },
  "6_1": {
    question: (
      <div className="text-base">
        6.1 หากน้องสามารถพัฒนานวัตกรรมเพื่อช่วยแก้ปัญหาสังคมนี้ได้หนึ่งอย่าง
        น้องจะเลือกพัฒนาอะไร?{" "}
        <span className="text-blue-500">
          (เช่น ระบบติดตามสุขภาพผ่านแอปพลิเคชัน, อุปกรณ์ IoT
          ตรวจวัดสัญญาณชีพอัตโนมัติ,
          หรือแอปพลิเคชันดูแลสุขภาพที่เชื่อมโยงกับหน่วยงานสาธารณสุข)
        </span>
      </div>
    ),
    criteria: (
      <ul className="ml-6">
        <li>
          เลือกนวัตกรรมที่สร้างสรรค์ ทันสมัย และมีความเหมาะสมกับปัญหา เช่น
          นวัตกรรมที่เกี่ยวกับโจทย์ที่เป็นนวัตกรรม
          พร้อมอธิบายแนวคิดโดยรวมของนวัตกรรมได้ชัดเจน{" "}
          <span className="text-red-500">(5 คะแนน)</span>
        </li>
        <li>
          เลือกนวัตกรรมที่เกี่ยวข้องกับปัญหา
          แต่ยังขาดรายละเอียดบางส่วนเกี่ยวกับการใช้งาน{" "}
          <span className="text-red-500">(4 คะแนน)</span>
        </li>
        <li>
          เลือกนวัตกรรมที่สามารถนำมาใช้ได้จริง
          แต่แนวคิดยังขาดความสร้างสรรค์หรือขาดความเป็นไปได้{" "}
          <span className="text-red-500">(3 คะแนน)</span>
        </li>
        <li>
          เลือกนวัตกรรมที่เกี่ยวข้องแต่ขาดความสมเหตุสมผล
          หรือไม่ตอบโจทย์ปัญหาสังคมได้ดี{" "}
          <span className="text-red-500">(2 คะแนน)</span>
        </li>
        <li>
          เลือกนวัตกรรมที่ไม่เกี่ยวข้องกับปัญหา หรือขาดเหตุผลรองรับ{" "}
          <span className="text-red-500">(1 คะแนน)</span>
        </li>
        <li>
          ไม่สามารถระบุนวัตกรรมที่ต้องการพัฒนาได้{" "}
          <span className="text-red-500">(0 คะแนน)</span>
        </li>
      </ul>
    ),
    maxScore: 5,
  },
  "6_2": {
    question: (
      <div className="text-base">
        6.2 จงอธิบายการทำงานของนวัตกรรมนี้{" "}
        <span className="text-blue-500">
          (อธิบายกระบวนการทำงานของนวัตกรรมดังกล่าวและวิธีการที่มันจะทำให้การดูแลผู้สูงอายุในชุมชนดีขึ้น
          เช่น วิธีการติดตามอาการของผู้สูงอายุ, การใช้เทคโนโลยี เช่น AI และ IoT)
        </span>
      </div>
    ),
    criteria: (
      <ul className="ml-6">
        <li>
          อธิบายการทำงานของนวัตกรรมได้ชัดเจน มีขั้นตอนการทำงานที่เป็นระบบ
          และเชื่อมโยงกับปัญหาสังคมโดยตรง เช่น
          นวัตกรรมที่เกี่ยวกับโจทย์ที่เป็นนวัตกรรม
          และการนำเทคโนโลยีมาใช้ให้เกิดประโยชน์สูงสุด{" "}
          <span className="text-red-500">(9 คะแนน)</span>
        </li>
        <li>
          อธิบายแนวทางได้ดี แต่ขาดรายละเอียดบางส่วน เช่น
          วิธีการเชื่อมโยงกับระบบสาธารณสุข หรือการนำไปใช้จริง{" "}
          <span className="text-red-500">(7 คะแนน)</span>
        </li>
        <li>
          มีแนวคิดที่เป็นไปได้ แต่ยังขาดความชัดเจนในการทำงานของเทคโนโลยี{" "}
          <span className="text-red-500">(5 คะแนน)</span>
        </li>
        <li>
          อธิบายได้เพียงแนวคิดกว้าง ๆ
          แต่ยังไม่สามารถเชื่อมโยงกับปัญหาและการนำไปใช้งานจริงได้{" "}
          <span className="text-red-500">(3 คะแนน)</span>
        </li>
        <li>
          ให้คำตอบที่คลุมเครือ
          หรือไม่มีรายละเอียดเพียงพอเกี่ยวกับกระบวนการทำงานของเทคโนโลยี{" "}
          <span className="text-red-500">(1 คะแนน)</span>
        </li>
        <li>
          ไม่สามารถอธิบายว่าระบบของตนช่วยแก้ปัญหาได้อย่างไร{" "}
          <span className="text-red-500">(0 คะแนน)</span>
        </li>
        <li>
          Bonus: เขียนคำได้ถูกต้อง{" "}
          <span className="text-red-500">(1 คะแนน)</span>
        </li>
        <li>
          Bonus: เขียนคำผิด <span className="text-red-500">(0 คะแนน)</span>
        </li>
      </ul>
    ),
    maxScore: 10,
  },
};
