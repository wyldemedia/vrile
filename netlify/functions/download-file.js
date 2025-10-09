const https = require('https');
const http = require('http');
const { URL } = require('url');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { url, filename } = event.queryStringParameters || {};
    
    if (!url) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'URL parameter is required' }),
      };
    }

    // Validate the URL is from your CloudFront domain
    const urlObj = new URL(url);
    if (!urlObj.hostname.includes('d10o3bkrceqyhb.cloudfront.net')) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Invalid download URL' }),
      };
    }

    // Determine filename
    const downloadFilename = filename || decodeURIComponent(url.split('/').pop()) || 'audio-file.mp3';
    
    return new Promise((resolve) => {
      const client = urlObj.protocol === 'https:' ? https : http;
      
      client.get(url, (response) => {
        if (response.statusCode !== 200) {
          resolve({
            statusCode: response.statusCode,
            headers,
            body: JSON.stringify({ error: 'Failed to fetch file' }),
          });
          return;
        }

        let data = [];
        
        response.on('data', (chunk) => {
          data.push(chunk);
        });
        
        response.on('end', () => {
          const buffer = Buffer.concat(data);
          
          resolve({
            statusCode: 200,
            headers: {
              ...headers,
              'Content-Type': 'audio/mpeg',
              'Content-Disposition': `attachment; filename="${downloadFilename}"`,
              'Content-Length': buffer.length,
            },
            body: buffer.toString('base64'),
            isBase64Encoded: true,
          });
        });
        
      }).on('error', (error) => {
        console.error('Download error:', error);
        resolve({
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Download failed' }),
        });
      });
    });
    
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};