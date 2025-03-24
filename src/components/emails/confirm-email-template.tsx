import * as React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ConfirmEmailProps {
  fullname: string;
  nickname: string | null;
}

export default function ConfirmEmail({
  fullname,
  nickname,
}: ConfirmEmailProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Helvetica"
          fallbackFontFamily="Helvetica"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>ยืนยันการเข้าร่วม ค่าย ComCamp 36</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto w-full max-w-[700px] rounded border border-solid border-[#eaeaea] p-0">
            <Section className="px-12 pt-12 text-start">
              <Img
                src={`https://cornflower.comcamp.io/_next/image?url=%2Flogo-black.png&w=640&q=75`}
                width="200"
                height="100"
                className="my-0"
              />
              <Heading className="my-10 text-2xl leading-tight font-medium">
                อีเมลยืนยันการยืนยันสิทธิเพื่อเข้าร่วมกิจกรรม ComCamp 36
              </Heading>
              <Text className="text-[1rem]">
                ขอบคุณน้อง {fullname} {!!nickname ? `(${nickname})` : ""}{" "}
                ที่ได้ยืนยันสิทธิในการเข้าร่วมกิจกรรมค่าย ComCamp 36
                โดยหลังจากนี้พี่ ๆ ขอรบกวนน้อง
              </Text>
              <Section>
                <Heading as="h3">
                  1. กรอกไซส์เสื้อยืดเพื่อจัดทำเสื้อยืดค่าย
                </Heading>
                <Text className="text-[1rem]">
                  ขอรบกวนน้องกรอกไซส์เสื้อยืดเพื่อจัดทำเสื่อยืดค่ายผ่านฟอร์มด้านล่าง
                  (ไม่มีค่าใช้จ่าย)
                </Text>
                <Text className="inline-flex gap-x-2">
                  <Text className="font-bold">Link ฟอร์ม:</Text>{" "}
                  <Link
                    className="text-[1rem]"
                    href="https://kmutt.me/cc36participanttshirt"
                  >
                    https://kmutt.me/cc36participanttshirt
                  </Link>
                </Text>
              </Section>
              <Section>
                <Heading as="h3">
                  2. เข้าร่วมกลุ่ม Line OpenChat
                  เพื่อรับข่าวสารและพูดคุยกับพี่ค่ายและเพื่อน ๆ
                </Heading>
                <Text className="inline-flex gap-x-2">
                  <Text className="font-bold">รหัสผ่าน:</Text>
                  <Text>CC36</Text>
                </Text>
                <Text>
                  หมายเหตุ: แนวทางการตั้งชื่อสำหรับเข้าร่วม Line OpenChat
                  N&apos; ชื่อจริง(ชื่อเล่น) ตัวอย่าง N&apos; ต้มยำ(ห่าน)
                </Text>
                <Text className="inline-flex gap-x-2">
                  <Text className="font-bold">
                    Link เข้าร่วม LINE OpenChat:
                  </Text>{" "}
                  <Link
                    className="text-[1rem]"
                    href="https://kmutt.me/cc36openchat"
                  >
                    https://kmutt.me/cc36openchat
                  </Link>
                </Text>
                <Section>
                  <Img
                    src="https://axizqhrfmehmjjbztewj.supabase.co/storage/v1/object/public/comcamp36-public-files/cc36openchat.png"
                    width="200"
                    height="200"
                    className="my-0"
                  />
                </Section>
                <Text>
                  สามารถเข้ามาสอบถามและพูดคุยกับเพื่อน ๆ ในค่ายได้เลยนะ!
                </Text>
              </Section>
            </Section>

            <Section className="px-12 text-sm leading-5">
              <Img
                src={`https://comcamp.io/_next/image?url=%2Fstatic%2Fimage%2Fsponsors%2Fkmutt-cpe-logo.png&w=640&q=75`}
                width="144"
                height="80"
                className="my-0"
              />

              <Text className="text-[0.8rem]">
                © 2025 ComCamp36. Computer Engineering Department, King
                Mongkut&apos;s University of Technology Thonburi, 126 Pracha
                Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140
              </Text>
              <Text className="text-center text-[0.8rem]">
                คุณได้รับอีเมลยืนยันการยืนยันสิทธิ์เพื่อเข้าร่วมกิจกรรม ComCamp
                36
              </Text>
              <Text className="text-center text-[0.8rem]">
                อีเมลฉบับนี้ถูกส่งโดยระบบอัตโนมัติ โปรดอย่าตอบกลับ
                หากมีข้อสงสัยสามารถติดต่อทีมงานได้ที่{" "}
                <Link href="mailto:kmutt.comcamp@gmail.com">
                  kmutt.comcamp@gmail.com
                </Link>{" "}
                หรือ
                <Link href="https://comcamp.io/#contact">ช่องทางต่อไปนี้</Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
