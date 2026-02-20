import Snowflake from 'snowflake-id';

export default (): string => {
  const snowflake = new Snowflake({
    mid: 1,
    offset: (2020-1-1)
  });

  const id = snowflake.generate().toString();
  return id;
} 