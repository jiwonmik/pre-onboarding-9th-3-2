const BASE_URL =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/19736c70-c41c-4a4a-b45f-b866eebab626/mock_data_example-flexsys.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230316T020316Z&X-Amz-Expires=86400&X-Amz-Signature=d7098ccf9fa9cb96188a3d3d6b8142d5f0d3f3fedb2a9213f87e7f081ddd3236&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22mock_data_example-flexsys.json%22&x-id=GetObject';

export async function fetchData() {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
