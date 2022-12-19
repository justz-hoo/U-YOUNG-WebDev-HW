<h1> <%= title %> </h1>
<p> <%= content %> </p>
<ul>
<% links.forEach(function(link){ %>
  <li><%= link %></li>
<% }) %>
</ul>