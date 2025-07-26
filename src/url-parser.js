const parseWorkItemUrl = (url) => {
  try {
    // Pattern: https://dev.azure.com/{organization}/{project}/_workitems/edit/{id}
    // Or: https://{organization}.visualstudio.com/{project}/_workitems/edit/{id}
    
    const azureDevOpsPattern = /https:\/\/dev\.azure\.com\/([^\/]+)\/([^\/]+)\/_workitems\/edit\/(\d+)/;
    const vstsPattern = /https:\/\/([^.]+)\.visualstudio\.com\/([^\/]+)\/_workitems\/edit\/(\d+)/;
    
    let match = url.match(azureDevOpsPattern);
    if (match) {
      return {
        organization: match[1],
        project: match[2],
        workItemId: parseInt(match[3])
      };
    }
    
    match = url.match(vstsPattern);
    if (match) {
      return {
        organization: match[1],
        project: match[2],
        workItemId: parseInt(match[3])
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing work item URL:', error);
    return null;
  }
}