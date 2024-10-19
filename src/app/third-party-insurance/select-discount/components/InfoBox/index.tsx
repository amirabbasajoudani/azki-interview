import { Box, Typography } from '@mui/material';

type Props = {
  pairs: Array<{ key: string; value: string }>;
};
export default function InfoBox({ pairs }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        background: 'whitesmoke',
        borderRadius: 2,
      }}
    >
      {pairs.map((item) => (
        <Box
          key={item.key}
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='body1' color='textPrimary'>
            {item.key}
          </Typography>
          <Typography variant='body2'>{item.value}</Typography>
        </Box>
      ))}
    </Box>
  );
}
