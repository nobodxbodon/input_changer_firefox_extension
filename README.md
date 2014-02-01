

The rules will apply to input of single line or multiple line (`<input>` or `<textarea>`).<br/>

Rules are in ${your_profile}/input_changer.sqlite.<br/>
url_pattern, input, and replacement can be regular expressions.<br/>
Example:<br/>
<table>
  <tr>
    <th>url_pattern</th>
    <th>input</th>
    <th>replacement</th>
  </tr>
  <tr>
    <td>addons.mozilla.org</td>
    <td>fwtw</td>
    <td>fromwheretowhere</td>
  </tr>
  <tr>
    <td></td>
    <td>nfw</td>
    <td>no f***ing way</td>
  </tr>
</table>
<br/>
After adding/deleting a rule, an existing page needs to be reloaded to make the change take effect.
