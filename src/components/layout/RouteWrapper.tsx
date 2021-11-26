import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import Loading from "components/loading";

export const PUBLIC_ROUTES = ["/"];
export const PRIVATE_ROUTES = [];

type RouteWrapperProps = {
  children: ReactNode;
};

const RouteWrapper = ({ children }: RouteWrapperProps) => {
  const router = useRouter();
  const { pathname } = router;

  const [loading, setLoading] = useState(true);

  const toast = useToast();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    // load data
    setLoading(false);
  }, [pathname]);

  return <>{loading ? <Loading /> : children}</>;
};

export default RouteWrapper;
