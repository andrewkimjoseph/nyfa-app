"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Flex } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";
import { useSupabase } from "@/providers/supabase-provider";

export default function Home() {
  const { isConnected, isDisconnected } = useAccount();
  const router = useRouter();
  const { supabase } = useSupabase();

  useEffect(() => {
    const checkUser = async () => {
      const user = (await supabase.auth.getUser()).data;

      if (isDisconnected) {
        router.replace("/not-connected");
      }

      if (isConnected && !user) {
        router.replace("/first-page");
      }

      if (isConnected && user) {
        router.replace("/all-nofas");
      }
    };
    checkUser();
  }, [isConnected, isDisconnected, router]);

  // Display a loading state while redirecting
  return (
    <Flex
      // ref={flexRef}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      h={"75vh"}
    >
      <Spinner size="sm" color="default" />
    </Flex>
  );
}
