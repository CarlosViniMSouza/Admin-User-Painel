"use client";

import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";

import {
  MarkdownField,
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export default function BlogProductShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: productData, isLoading: productIsLoading } = useOne({
    resource: "products",
    id: record?.product?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <NumberField value={record?.id ?? ""} />

        <Typography variant="body1" fontWeight="bold">
          {"Name"}
        </Typography>
        <TextField value={record?.name} />

        <Typography variant="body1" fontWeight="bold">
          {"Price"}
        </Typography>
        <MarkdownField value={record?.price} />

        <Typography variant="body1" fontWeight="bold">
          {"Category"}
        </Typography>
        {productIsLoading ? <>Loading...</> : <>{productData?.data?.title}</>}
      </Stack>
    </Show>
  );
}