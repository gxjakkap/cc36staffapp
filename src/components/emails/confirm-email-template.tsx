import * as React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ConfirmEmailProps {
  fullname: string;
}

export default function ConfirmEmail({ fullname }: ConfirmEmailProps) {
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
      <Preview>ยืนยันการเข้าร่วม ค่าย ComCamp36</Preview>
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
                อีเมลยืนยันการยืนยันสิทธิ์เพื่อเข้าร่วมกิจกรรม Comcamp36
              </Heading>
              <Text className="text-[1rem]">
                ขอบคุณน้อง {fullname} ที่ได้ยืนยันสิทธิ์ในการเข้าร่วมกิจกรรมค่าย
                Comcamp36 ขอให้ น้อง เข้ากลุ่ม Line Open Chat
              </Text>
              <Text>รหัสผ่าน : CC36</Text>
              <Text>
                หมายเหตุ : แนวทางการตั้งชื่อเมื่อเข้า Line Open Chat N&apos;
                ชื่อจริง(ชื่อเล่น) ตัวอย่าง N&apos; ต้มยำ(ห่าน)
              </Text>
              <Section>
                <Img
                  src="https://media.discordapp.net/attachments/1330249133642092625/1353384783492812932/image.png?ex=67e1754d&is=67e023cd&hm=207933de3bcf112da8a3c5b7f02b02634796f1f0c07df06f598d0b5a9198fc50&=&format=webp&quality=lossless&width=1392&height=1392"
                  width="200"
                  height="200"
                  className="my-0"
                />
              </Section>
              <Text>เข้ามาพูดคุยกับพี่ ๆ ได้เลยน่ะ</Text>
            </Section>

            <Section className="px-12 text-sm leading-5">
              <Img
                src={`https://comcamp.io/_next/image?url=%2Fstatic%2Fimage%2Fsponsors%2Fkmutt-cpe-logo.png&w=640&q=75`}
                width="144"
                height="80"
                className="my-0"
              />

              <Text className="text-[0.8rem]">
                © 2025 Comcamp36 Computer Engineering Department, King
                Mongkut&apos;s University of Technology Thonburi, 126 Pracha
                Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140
              </Text>
              <Text className="text-center text-[0.8rem]">
                คุณได้รับอีเมลยืนยันการยืนยันสิทธิ์เพื่อเข้าร่วมกิจกรรม
                Comcamp36
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
