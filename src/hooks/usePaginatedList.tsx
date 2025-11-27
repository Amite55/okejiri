import { useState } from "react";

type FetchFunction<T> = (page: number) => Promise<T[]>;

export function usePaginatedList<T>(fetchFn: FetchFunction<T>) {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newData = await fetchFn(page);

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setData((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  return {
    data,
    loading,
    loadMore,
    page,
    hasMore,
  };
}

// useCase ====================================================== FlatList example

// const { data, loadMore, loading } = usePaginatedList(fetchUsers);

// <FlatList
//   data={data}
//   renderItem={renderUser}
//   onEndReached={loadMore}
//   onEndReachedThreshold={0.4}
//   ListFooterComponent={loading ? <ActivityIndicator /> : null}
// />
