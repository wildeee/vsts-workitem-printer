const searchAndDisplayWorkitem = async() => {

  const transformWorkItem = (workItem) => {
    const fields = workItem.fields;

    const problem = replaceImgTags(fields['Custom.Problem'] || fields['System.Reason']);
    const description = replaceImgTags(fields['System.Description']);
    const acceptance = replaceImgTags(fields['Microsoft.VSTS.Common.AcceptanceCriteria']);
    
    return {
      id: fields['System.Id'],
      title: fields['System.Title'] || 'No Title',
      workItemType: fields['System.WorkItemType'] || 'Unknown',
      description: description,
      acceptanceCriteria: acceptance,
      problem: problem,
    };
  };

  const displayWorkitem = (workItem, vstsEditLink) => {
    document.getElementById('workitem-url').href = vstsEditLink;
    document.getElementById('work-item-type').textContent = workItem.workItemType;
    document.getElementById('work-item-id').textContent = ` #${workItem.id}`;
    document.getElementById('work-item-title').textContent = workItem.title;
    document.getElementById('work-item-problem').innerHTML = workItem.problem;
    document.getElementById('work-item-description').innerHTML = workItem.description;
    document.getElementById('work-item-accepptance-criteria').innerHTML = workItem.acceptanceCriteria;
    document.getElementById('workitem-area').classList.remove('hide');
    document.getElementById('input-area').classList.remove('margin-top-20vh');
    document.title = `Requisito_${workItem.id}`;
  };

  const replaceImgTags = (html) => {
    const container = document.createElement('div');
    container.innerHTML = html;

    container.querySelectorAll('img').forEach(img => {
      const texto = document.createTextNode('(Imagem consta no VSTS)');
      img.parentNode.replaceChild(texto, img);
    });

    return container.innerHTML;
  }

  const vstsEditLink = document.getElementById('url-input').value;
  const auth = btoa(':' + PERSONAL_ACCESS_TOKEN);
  this.headers = new Headers({
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  const urlParts = parseWorkItemUrl(vstsEditLink);
  if (!urlParts) {
    throw new Error('Invalid work item URL format. Please use a valid Azure DevOps work item URL.');
  }

  const baseUrl = `https://dev.azure.com/${urlParts.organization}/${urlParts.project}/_apis/wit/workitems/${urlParts.workItemId}`;

  const url = `${baseUrl}?api-version=7.0&$expand=fields`;

  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
    mode: 'cors',
  });

  const responseJson = await response.json();
  const workItem = transformWorkItem(responseJson);
  displayWorkitem(workItem, vstsEditLink);
};

window.onload = () => {
  document.getElementById('search-btn').addEventListener('click', searchAndDisplayWorkitem);
  document.getElementById('url-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      searchAndDisplayWorkitem();
    }
  });
}; 

