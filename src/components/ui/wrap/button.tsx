import { LoaderCircle } from "lucide-react";
import { Button as ShadcnButton, ButtonProps } from "../button";
import { cn } from "@/lib/utils";

interface WrapButtonProps extends ButtonProps {
  loading?: boolean;
}

export const Button = (props: WrapButtonProps) => {
  return (
    <ShadcnButton {...props} disabled={props.loading || props.disabled}>
      {props.loading ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        props.children
      )}
    </ShadcnButton>
  );
};
