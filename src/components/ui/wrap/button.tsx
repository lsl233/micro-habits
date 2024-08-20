import { LoaderCircle } from "lucide-react";
import { Button as ShadcnButton, ButtonProps } from "../button";
import { cn } from "@/lib/utils";

interface WrapButtonProps extends ButtonProps {
  loading?: boolean | undefined;
}

export const Button = (props: WrapButtonProps) => {
  console.log(props.loading, 'loading');
  const {loading, disabled, ...restProps} = props;
  return (
    <ShadcnButton {...restProps} disabled={loading || disabled}>
      {props.loading === true ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        props.children
      )}
    </ShadcnButton>
  );
};
