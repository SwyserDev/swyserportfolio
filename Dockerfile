FROM httpd:2.4
COPY ./dist/ /usr/local/apache2/htdocs/



# docker run -p 80:80/tcp -dit swyserdev/swyser-portfolio